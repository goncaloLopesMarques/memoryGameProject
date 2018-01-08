/*jshint esversion: 6 */
var boardList = require('./boardList.js');

class memoryGame {
    constructor(ID) {
        this.gameID = ID;
        // 0 = single Player, 1 = Multiplayer
        this.type ='',
        this.linhas = 4,
        this.colunas = 4,
        this.gamePlayers = [],
        this.numberOfPlayers = 0,
        this.gameEnded = false;
        this.gameStarted = false;
        this.playerTurn = 1;
        this.winner = 0;
        this.board = [];
    }

    join(player){
        if(this.gamePlayers.length> 4){
            console.log("numero maximo de utilizadores")
        }else{
            this.gamePlayers[this.numberOfPlayers] = player;
            this.numberOfPlayers ++;
        }       
    }
    setPlayer(player){
        this.gamePlayers[this.numberOfPlayers] = player;
        this.numberOfPlayers++;
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
    boardGenerator(linhas, colunas){
        var aux =linhas + colunas
        var boardAux =[]
        var boardAux1 = [];
        var boardAux2 = [];
        if(this.numberOfPlayers < 1){
            console.log("Não ha players para jogar")
            return
        }
        if( aux % 2 !== 0){
            console.log("linhas nao são par")
            return
        }
        if(linhas*colunas >80){
            console.log("não ha pares suficientes para este tamanho de tabuleiro")
            return
        }
        var gameBoard=[];
        for(var i =0; i<41; i++){
            gameBoard[i]=i;
        }

        if(this.numberOfPlayers == 1 || this.numberOfPlayers ==2){

            gameBoard = this.shuffle(gameBoard)        
            //este for preenche a board que fica do lado do servidor
            for(var i=0; i< (linhas * colunas)/2; i++){
                boardAux[i] = gameBoard[i];
            }
         //este for preenche a board que vai ser enviada para o utilizador
         for(var i=0; i< (linhas * colunas); i++){
             this.board[i] = "hidden"
         }
         //inicialização de variaveis e preenchimento das boards
            var boardListAux = new boardList();
            boardListAux.createBoard(this.gameID,boardAux.concat(boardAux));
            this.gameStarted = true
            this.linhas = linhas
            this.colunas = colunas

        }else if(this.numberOfPlayers == 3){
            if(linhas >=4 && colunas >=6){
                var boardAux=[];
                var boardAux1 = [];
                var boardAux2 = [];

                boardAux1= this.shuffle(boardAux)
                boardAux2 = boardAux1
                var boardAux = boardAux1.concat(boardAux2);
                this.board = boardAux2;
                this.linhas = linhas
                this.colunas = colunas
                this.gameStarted = true 
            }else{
                var boardAux=[];
                var boardAux1 = [];
                var boardAux2 = [];
                var i = 0;
                for (i = 0; i < 32; i++) { 
                    boardAux1[i] = Math.floor(Math.random() * 42);
                    boardAux2[i] = boardAux1[i];
                }

                var boardAux = boardAux1.concat(boardAux2);
                this.board = this.shuffle(boardAux);
                this.linhas = linhas
                this.colunas = colunas
                this.gameStarted = true 
            }
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
