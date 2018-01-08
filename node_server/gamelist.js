/*jshint esversion: 6 */

var memoryGame = require('./gamemodel.js');
var player     = require('./playermodel.js')

class GameList {
	constructor() {
		this.contadorID = 0;
		this.playerContador=0;
        this.games = new Map();
    }

    gameByID(gameID) {
    	let game = this.games.get(gameID);
    	return game;
    }

    createGame(playerName, socketID, linhas, colunas) {
		this.playerContador =0;
		var playerAux = new player(playerName);
		this.playerContador = this.playerContador+1;
		playerAux.setPlayerSocketID(socketID);
		playerAux.setID(this.playerContador);
		
		this.contadorID = this.contadorID+1;
		var game = new memoryGame(this.contadorID);
		game.setPlayer(playerAux);

    	this.games.set(game.gameID, game);
    	return game;
	}
	startGame(gameID, numberOfPlayers ,linhas, colunas){
		let game = this.gameByID(gameID);
		game.boardGenerator(linhas,colunas);
		if(numberOfPlayers==1){
			game.type = 0
		}else{
			game.type=1
		}
		console.log(game)
		return game
	}

    joinGame(gameID, playerName, socketID) {
    	let game = this.gameByID(gameID);
    	if (game===null) {
    		return null;
		}

		var playerAux = new player(playerName);
		this.playerContador = this.playerContador+1;
		playerAux.setPlayerSocketID(socketID);
		playerAux.setID(this.playerContador);

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
			 	  if ((value.gamePlayers[0].playerSocketID == socketID)||(value.gamePlayers[1].playerSocketID == socketID)) {
						games.push(value);
				}	
		}
		return games;
    }

    getLobbyGamesOf(socketID) {
    	let games = [];
    	for (var [key, value] of this.games) {
    		if ((!value.gameStarted) && (!value.gameEnded))  {
				for(var i = 0 ; i < value.numberOfPlayers; i++){
					if ((value.gamePlayers[i].playerSocketID != socketID)) {
						games.push(value);
					}
				}
    		}
		}
		return games;
    }
}

module.exports = GameList;
