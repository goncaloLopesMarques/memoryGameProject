/*jshint esversion: 6 */

class memoryGame {
    constructor(ID, player1Name) {
        this.gameID = ID;
        this.splayer1SocketID = '',
        this.gamePlayers = [],
        this.gamePlayers[0] = player1Name,
        this.numberOfPlayers = 1,
        this.gameEnded = false;
        this.gameStarted = false;
        this.player1= player1Name;
        this.playerTurn = 1;
        this.winner = 0;
        this.board = [];
    }

    join(playerName){
        if(this.gamePlayers.length> 4){
            console.log("numero maximo de utilizadores")
        }else{
            this.gamePlayers[this.numberOfPlayers] = playerName;
            this.numberOfPlayers ++;
        }
        if(this.numberOfPlayers>1){
            this.gameStarted = true;
        }
        
    }

    hasRow(value){
        return  ((this.board[0]==value) && (this.board[1]==value) && (this.board[2]==value)) || 
                ((this.board[3]==value) && (this.board[4]==value) && (this.board[5]==value)) || 
                ((this.board[6]==value) && (this.board[7]==value) && (this.board[8]==value)) || 
                ((this.board[0]==value) && (this.board[3]==value) && (this.board[6]==value)) || 
                ((this.board[1]==value) && (this.board[4]==value) && (this.board[7]==value)) || 
                ((this.board[2]==value) && (this.board[5]==value) && (this.board[8]==value)) || 
                ((this.board[0]==value) && (this.board[4]==value) && (this.board[8]==value)) || 
                ((this.board[2]==value) && (this.board[4]==value) && (this.board[6]==value));
    }  

    checkGameEnded(){
        if (this.hasRow(1)) {
            this.winner = 1;
            this.gameEnded = true;
            return true;
        } else if (this.hasRow(2)) {
            this.winner = 2;
            this.gameEnded = true;
            return true;
        } else if (this.isBoardComplete()) {
            this.winner = 0;
            this.gameEnded = true;
            return true;
        }
        return false;
    }

    isBoardComplete(){
        for (let value of this.board) {
            if (value === 0) {
                return false;
            }
        }
        return true;
    }
    boardGenerator(){
        if(this.numberOfPlayers < 1){
            console.log("Não ha players para jogar")
        }else if(this.numberOfPlayers == 1 || this.numberOfPlayers ==2){
            // tabuleiro 4X4
            // criamos primeiro uma board com metade do comprimento com numeros aliatorios depois é so criar outro igual
            //criar o primeiro
            //depois junta-se o primeiro com a sua copia
            //por ultimo misturamos tudo com o shuffle
            var boardAux=[];
            var boardAux1 = [];
            var boardAux2 = [];
            var i = 0;
            for (i = 0; i < 9; i++) { 
                boardAux1[i] = Math.floor(Math.random() * 42);
                boardAux2[i] = boardAux1[i];
            }
            var boardAux = boardAux1.concat(boardAux2);
            this.board = this.shuffle(boardAux);
        }else if(this.numberOfPlayers == 3){
            // 4X6
        }else{
            //6X6
        }

    }
    shuffle(arr) {
        return arr.sort(() => Math.random() - 0.5);
      }

    play(playerNumber, index){
        if (!this.gameStarted) {
            return false;
        }
        if (this.gameEnded) {
            return false;
        }
        if (playerNumber != this.playerTurn) {
            return false;
        }
        if (this.board[index] !== 0) {
            return false;
        }
        this.board[index] = playerNumber;
        if (!this.checkGameEnded()) {
            this.playerTurn = this.playerTurn == 1 ? 2 : 1;
        }
        return true;
    }

}

module.exports = memoryGame;
