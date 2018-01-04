/*jshint esversion: 6 */

var memoryGame = require('./gamemodel.js');

class GameList {
	constructor() {
        this.contadorID = 0;
        this.games = new Map();
    }

    gameByID(gameID) {
    	let game = this.games.get(gameID);
    	return game;
    }

    createGame(playerName, socketID) {
		this.contadorID = this.contadorID+1;
		var game = new memoryGame(this.contadorID, playerName);
		game.player1SocketID = socketID;
    	this.games.set(game.gameID, game);
    	return game;
	}
	startGame(game){
		game.boardGenarator();
	}

    joinGame(gameID, playerName, socketID) {
    	let game = this.gameByID(gameID);
    	if (game===null) {
    		return null;
    	}
    	game.join(playerName);
    	game.player2SocketID = socketID;
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
		let games = [];
    	for (var [key, value] of this.games) {
    		if ((value.player1SocketID == socketID) || (value.player2SocketID == socketID)) {
				games.push(value);
    		}
		}
		return games;
    }

    getLobbyGamesOf(socketID) {
    	let games = [];
    	for (var [key, value] of this.games) {
    		if ((!value.gameStarted) && (!value.gameEnded))  {
    			if ((value.player1SocketID != socketID) && (value.player2SocketID != socketID)) {
    				games.push(value);
    			}
    		}
		}
		return games;
    }
}

module.exports = GameList;
