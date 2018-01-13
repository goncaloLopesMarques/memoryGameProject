/*jshint esversion: 6 */
class memoryGame {
    constructor(ID, type) {
        this.gameID = ID;
        // 1 = single Player, 0 = Multiplayer
        this.type = type,
            this.linhas = 4,
            this.colunas = 4,
            this.numeroJogadas = 1
        this.gamePlayers = [],
            this.numberOfPlayers = 0,
            this.startTime = '',
            this.gameEnded = false;
        this.gameStarted = false;
        this.playerTurn = 1;
        this.winner = 0;
        this.board = [];
        this.pair = [];
        //usado para guardar os indexes na validação se é par
        this.indexes = [];
        //usado para saber quando o jogo acaba
        this.numberOfPairs;
    }
    setStartTime() {
        // falta acrescentar o dia mes ano
        var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
 
        var currentdate = new Date();
        this.startTime = "Date: " + currentdate.getDate() + "/" +
            monthNames[currentdate.getMonth()] + "/" +
            currentdate.getFullYear() + " Time: " +
currentdate.getHours() +
            ":" + currentdate.getMinutes() +
            ":" + currentdate.getSeconds();
    }
    getPlayerByName(playerName) {
        for (var i = 0; i < this.numberOfPlayers; i++) {
            if (this.gamePlayers[i].name == playerName) {
                return true;
            }
        }
        return false
    }
    join(player) {
        if (this.gamePlayers.length == 4) {
            console.log("numero maximo de utilizadores")
        } else {
            this.gamePlayers[this.numberOfPlayers] = player;
            this.numberOfPlayers++;
        }
    }
    setPlayer(player) {
        this.gamePlayers[this.numberOfPlayers] = player;
        this.numberOfPlayers++;
    }
 
    checkGameEnded() {
        if (this.numberOfPairs == 0) {
 
            return true
        }
        return false;
    }
isBoardComplete() {
        for (let value of this.board) {
            if (value === 0) {
                return false;
            }
        }
        return true;
    }
    gameWinner() {
        var total = [];
        if (this.gameEnded == true) {
            for (var i = 0; i < this.numberOfPlayers; i++) {
                total[i] = this.gamePlayers[i];
            }
            total.sort(function (a, b) {
                if (a.movesPlusPoints > b.movesPlusPoints) {
                    return -1
                }
                return 1
            });
            this.winner = total[0];
        }
 
    }
    goEmpty() {
        this.board[this.indexes[0]] = "empty"
        this.board[this.indexes[1]] = "empty"
    }
 
    boardGenerator(linhas, colunas, gameID, serverBoards) {
 
        var aux = linhas + colunas
        var boardAux = []
 var boardAux1 = [];
 
        if (this.numberOfPlayers < 1) {
            console.log("Não ha players para jogar")
            return
        }
        if (aux % 2 !== 0) {
            console.log("linhas nao são par")
            return
        }
        if (linhas * colunas > 80) {
            console.log("não ha pares suficientes para este tamanho de tabuleiro")
            return
        }
        var gameBoard = [];
 
        for (var i = 0; i < 41; i++) {
            gameBoard[i] = i;
        }
        this.numberOfPairs = (linhas * colunas) / 2
        if (this.numberOfPlayers == 1 || this.numberOfPlayers == 2) {
            gameBoard = this.shuffle(gameBoard)
            //este for preenche a board que fica do lado do servidor
            for (var i = 0; i < (linhas * colunas) / 2; i++) {
                boardAux[i] = gameBoard[i];
            }
            boardAux = boardAux.concat(boardAux)
            boardAux = this.shuffle(boardAux)
            //este for preenche a board que vai ser enviada para o utilizador
            for (var i = 0; i < (linhas * colunas); i++) {
                this.board[i] = "hidden"
            }
            //inicialização de variaveis e preenchimento das boards
    serverBoards.set(gameID, boardAux)
            this.gameStarted = true
            this.linhas = linhas
            this.colunas = colunas
        } else if (this.numberOfPlayers == 3) {
            if (linhas > 3 && colunas > 4) {
                gameBoard = this.shuffle(gameBoard)
                //este for preenche a board que fica do lado do servidor
                for (var i = 0; i < (linhas * colunas) / 2; i++) {
                    boardAux[i] = gameBoard[i];
                }
                //este for preenche a board que vai ser enviada para o utilizador
                for (var i = 0; i < (linhas * colunas); i++) {
                    this.board[i] = "hidden"
                }
                //inicialização de variaveis e preenchimento das boards
                boardAux = boardAux.concat(boardAux)
                boardAux = this.shuffle(boardAux)
                //este for preenche a board que vai ser enviada para o utilizador
                for (var i = 0; i < (linhas * colunas); i++) {
                    this.board[i] = "hidden"
                }
                //inicialização de variaveis e preenchimento das boards
                serverBoards.set(gameID, boardAux)
                this.gameStarted = true
                this.linhas = linhas
                this.colunas = colunas
            } else {
                gameBoard = this.shuffle(gameBoard)
                //este for preenche a board que fica do lado do servidor
                for (var i = 0; i < (4 * 5) / 2; i++) {
                    boardAux[i] = gameBoard[i];
}
                //este for preenche a board que vai ser enviada para o utilizador
                for (var i = 0; i < (4 * 5); i++) {
                    this.board[i] = "hidden"
                }
                //inicialização de variaveis e preenchimento das boards
                boardAux = boardAux.concat(boardAux)
                boardAux = this.shuffle(boardAux)
                //este for preenche a board que vai ser enviada para o utilizador
                for (var i = 0; i < (linhas * colunas); i++) {
                    this.board[i] = "hidden"
                }
                //inicialização de variaveis e preenchimento das boards
                serverBoards.set(gameID, boardAux)
                this.gameStarted = true
                this.linhas = 4
                this.colunas = 5
            }
        } else if (this.gamePlayers == 4) {
            if (linhas > 3 && colunas > 5) {
                gameBoard = this.shuffle(gameBoard)
                //este for preenche a board que fica do lado do servidor
                for (var i = 0; i < (linhas * colunas) / 2; i++) {
                    boardAux[i] = gameBoard[i];
                }
                //este for preenche a board que vai ser enviada para o utilizador
                for (var i = 0; i < (linhas * colunas); i++) {
                    this.board[i] = "hidden"
                }
                //inicialização de variaveis e preenchimento das boards
                boardAux = boardAux.concat(boardAux)
                boardAux = this.shuffle(boardAux)
                //este for preenche a board que vai ser enviada para o utilizador
 for (var i = 0; i < (linhas * colunas); i++) {
                    this.board[i] = "hidden"
                }
                //inicialização de variaveis e preenchimento das boards
                serverBoards.set(gameID, boardAux)
                this.gameStarted = true
                this.linhas = linhas
                this.colunas = colunas
            } else {
                gameBoard = this.shuffle(gameBoard)
                //este for preenche a board que fica do lado do servidor
                for (var i = 0; i < (4 * 6) / 2; i++) {
                    boardAux[i] = gameBoard[i];
                }
                //este for preenche a board que vai ser enviada para o utilizador
                for (var i = 0; i < (4 * 6); i++) {
                    this.board[i] = "hidden"
                }
                //inicialização de variaveis e preenchimento das boards
                boardAux = boardAux.concat(boardAux)
                boardAux = this.shuffle(boardAux)
                //este for preenche a board que vai ser enviada para o utilizador
                for (var i = 0; i < (linhas * colunas); i++) {
                    this.board[i] = "hidden"
                }
                //inicialização de variaveis e preenchimento das boards
                serverBoards.set(gameID, boardAux)
                this.gameStarted = true
                this.linhas = 4
                this.colunas = 6
            }
 }
 
    }
    shuffle(arr) {
        var arrayAux = arr
        var j, x, i;
        for (i = arrayAux.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = arrayAux[i];
            arrayAux[i] = arrayAux[j];
            arrayAux[j] = x;
        }
        return arrayAux
    }
    checkPair(index, serverBoard, playerNumber) {
        if (this.pair[0] == this.pair[1]) {
            this.board[this.indexes[0]] = "empty"
            this.board[this.indexes[1]] = "empty"
            this.gamePlayers[playerNumber - 1].points++;
            this.numberOfPairs--;
            this.gamePlayers[playerNumber - 1].movesPlusPoints =
                this.gamePlayers[playerNumber - 1].points + this.gamePlayers[playerNumber - 1].moves;
            if (this.checkGameEnded()) {
                this.gameEnded = true;
                this.gameWinner();
            }
            //se entrar aqui acertou no par e fica com o turno
            this.playerTurn = this.playerTurn;
            this.numeroJogadas = 1
 
        } else {
            this.board[this.indexes[0]] = "hidden"
            this.board[this.indexes[1]] = "hidden"
 if (this.type == 0) {
                //se entrar aqui é SinglePlayer
                this.playerTurn = this.playerTurn;
                this.numeroJogadas = 1
            } else {
                //se entrar aqui é multiplayer
                if (this.playerTurn == this.numberOfPlayers) {
                    this.playerTurn = 1
                    this.numeroJogadas = 1
                } else {
                    this.playerTurn++;
                    this.numeroJogadas = 1
                }
            }
        }
 
    }
 
    play(playerNumber, index, gameID, serverBoard) {
        console.log("playerNumber: " + playerNumber)
 
        if (!this.gameStarted) {
            return false;
        }
        if (this.gameEnded) {
            return false;
        }
        if (this.board[index] != "hidden") {
            return false;
        }
        if (playerNumber != this.playerTurn) {
return false;
        }
        if (this.numeroJogadas == 1) {
            this.board[index] = serverBoard[index]
            this.pair[0] = serverBoard[index]
            this.indexes[0] = index
            this.numeroJogadas++;
        } else {
            this.board[index] = serverBoard[index]
            this.numeroJogadas++;
            this.gamePlayers[playerNumber - 1].moves++;
            this.pair[1] = serverBoard[index]
            this.indexes[1] = index
            return 2;
        }
        return 1;
    }
 
}
 
module.exports = memoryGame;

