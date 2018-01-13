/*jshint esversion: 6 */
 
var memoryGame = require('./gamemodel.js');
var player     = require('./playermodel.js')
 
class GameList {
  constructor() {
    this.contadorID = 0,
    this.playerContador=0,
    this.games = new Map()
      }
 
    gameByID(gameID) {
      let game = this.games.get(gameID);
      return game;
    }
 
    createGameMultiPlayer(playerName, socketID, linhas, colunas) {
    this.playerContador =0;
    var playerAux = new player(playerName);
    this.playerContador = this.playerContador+1;
    playerAux.setPlayerSocketID(socketID);
 playerAux.setID(this.playerContador);
    playerAux.setName(playerName)    
    this.contadorID = this.contadorID+1;
    var game = new memoryGame(this.contadorID,0);
    game.setPlayer(playerAux);
 
      this.games.set(game.gameID, game);
      return game;
  }
  createGameSinglePlayer(playerName, socketID, linhas, colunas) {
    var playerAux = new player(playerName);
    playerAux.setPlayerSocketID(socketID);
    playerAux.setID(1);
    playerAux.setName(playerName)    
    this.contadorID = this.contadorID+1;
    var game = new memoryGame(this.contadorID,1);
    game.setPlayer(playerAux);
      this.games.set(game.gameID, game);
      return game;
  }
  startGame(gameID, numberOfPlayers ,linhas, colunas, serverBoards){
 
    let game = this.gameByID(gameID);
    game.boardGenerator(linhas,colunas,gameID,serverBoards);
    if(numberOfPlayers==1){
      game.type = 0
    }else{
      game.type=1
    }
 
    return game
  } 
joinGame(gameID, playerName, socketID) {
      let game = this.gameByID(gameID);
      if (game===null) {
        return null;
    }
    var playerAux = new player();
    this.playerContador = this.playerContador+1;
    playerAux.setPlayerSocketID(socketID);
    playerAux.setID(this.playerContador);
    playerAux.setName(playerName);
    game.join(playerAux);
    
      return game;
    }
 
    removeGame(gameID, socketID) {
    let game = this.gameByID(gameID);
      if (game===null) {
        return null;
      }else{
      this.games.delete(gameID);
      this.contadorID --;
    }
      return game;
    }
 
    getConnectedGamesOf(socketID) {
    //FUNÇAO ESTATICA TENTAR POR A VALIDAÇÂO DINAMICA!!!
    let games = [];
      for (var [key, value] of this.games) {
      for(var i =0; i< value.numberOfPlayers; i++){
        if (value.gamePlayers[i].playerSocketID == socketID) {
games.push(value);
          }  
      }
          
    }
    return games;
    }
 
    getLobbyGamesOf(socketID,playerName) {
    let games = [];
    var arrayOfNames = [];
    
 
      for (var [key, value] of this.games) {
      for(var i =0; i< value.numberOfPlayers; i++){
        arrayOfNames[i] = value.gamePlayers[i].name;
      }
        if ((!value.gameStarted) && (!value.gameEnded) && (value.type == 0))  {
        if ((arrayOfNames.includes(playerName))) {
            console.log("este player ja se encontra no jogo")
            return games;
        }else{
            games.push(value);
        }      
        }
    }
    return games;
  }
 
}
 
module.exports = GameList;