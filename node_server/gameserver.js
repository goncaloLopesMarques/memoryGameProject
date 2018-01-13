/*jshint esversion: 6 */
 
var app = require('http').createServer();
 
// CORS TRIALS
// var app = require('http').createServer(function(req,res){
//   // Set CORS headers
//   res.setHeader('Access-Control-Allow-Origin', 'http://dad.p6.dev');
//   res.setHeader('Access-Control-Request-Method', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   res.setHeader('Access-Control-Allow-Headers', req.header.origin);
//   if ( req.method === 'OPTIONS' ) {
//     res.writeHead(200);
//     res.end();
//     return;
//   }
// });
 
var io = require('socket.io')(app);
 
var memoryGame = require('./gamemodel.js');
var GameList = require('./gamelist.js');
var boardList = require('./boardlist.js')
 
app.listen(8080, function(){
  console.log('listening on *:8080');
});
 
// ------------------------
// Estrutura dados - server
// ------------------------
let games = new GameList();
let serverBoards = new Map();
 
io.on('connection', function (socket) {
    console.log('client has connected');
 
    socket.on('createMulti_game', function (data){
    console.log('A new game is about to be created');
    let game = games.createGameMultiPlayer(data.playerName, socket.id);
    game.setStartTime();
      // Use socket channels/rooms
    socket.join(game.gameID);
    // Notification to the client that created the game
    socket.emit('my_active_games_changed');
    // Notification to all clients
    io.emit('lobby_changed');
  });
  socket.on('createSingle_game', function (data){
    console.log('A new game is about to be created');
    let game = games.createGameSinglePlayer(data.playerName, socket.id);
    game.setStartTime();
      // Use socket channels/rooms
    socket.join(game.gameID);
    // Notification to the client that created the game
    socket.emit('my_active_games_changed');
  });
  socket.on('start_game', function (data){
    console.log('A new game is about to be started');
 
    let game = games.startGame(data.game.gameID, data.game.numberOfPlayers ,data.linhas, data.colunas,serverBoards)
    // Use socket channels/rooms
    // Notification to the client the game was created
io.to(game.gameID).emit('my_active_games_changed');
    io.emit('lobby_changed');
  });
 
  socket.on('play',function(data){
    let gameID = data.gameID
    let game = games.gameByID(data.gameID);
    let serverBoard= serverBoards.get(gameID)
 
    if(game ==null){
      socket.emit('invalid_play',{
        'type': 'Invalid_Game', 'game':null
      });
      return;
    }
    var numPlayer =0;
    if(game.gamePlayers[0].playerSocketID == socket.id){
      numPlayer = game.gamePlayers[0].id;
    }else if(game.gamePlayers[1].playerSocketID == socket.id){
      numPlayer = game.gamePlayers[1].id;
    }else if(game.gamePlayers[2].playerSocketID == socket.id){
      numPlayer = game.gamePlayers[2].id;
    }else if(game.gamePlayers[3].playerSocketID == socket.id){
      numPlayer = game.gamePlayers[3].id;
    }
 
    if(numPlayer == 0){
      socket.emit('invalid_play',{
        'type':'Invalid_Player',
        'game': game
});
      return
    }
    var aux = game.play(numPlayer, data.index,data.gameID, serverBoard); 
    if( aux == 1){
      io.to(game.gameID).emit('game_changed',game)
    }else if(aux ==2){
      io.to(game.gameID).emit('game_changed',game)
      
      setTimeout(function(){game.checkPair(data.index,serverBoard,numPlayer)
      io.to(game.gameID).emit('game_changed',game)
      },1000);
      
    }
    else{
      socket.emit('invalid_play',{
        'type': 'Invalid_Play',
        'game': game
      });
      return;
    }
 
 
  })
  socket.on('join_game',function(data){
    let game = games.joinGame(data.gameID, data.playerName, socket.id);
    socket.join(game.gameID);
    console.log("player joined")
    io.to(game.gameID).emit('player_joined', data.playerName);
    io.to(game.gameID).emit('my_active_games_changed');
    socket.emit('lobby_changed');
  })
socket.on('remove_game',function(data){
    if(games.removeGame(data,socket.id)){
       console.log("Game deleted successfully!")  
    }
  
    socket.emit('my_active_games_changed');
    io.emit('lobby_changed');
    });
 
 
    socket.on('get_my_activegames', function (data){
    var my_games = games.getConnectedGamesOf(socket.id,data.playerName);
    socket.emit('my_active_games',my_games);
  });
 
  socket.on('get_my_loby_games',function(data){
    var my_games = games.getLobbyGamesOf(socket.id,data.playerName);
    socket.emit('my_lobby_games',my_games);
  });
 
 
});

