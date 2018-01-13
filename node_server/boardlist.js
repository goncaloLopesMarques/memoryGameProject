/*jshint esversion: 6 */
 
var serverBoard = require('./boardmodel.js');
 
 
class boardList {
  constructor() {
        this.boards = new Map();
    }
 
    boardByID(boardID) {
      let board = this.boards.get(boardID);
      return board;
  }
  createBoard(id,board) {
    var serverBoardToStore = new serverBoard(id,board);
    this.boards.set(serverBoardToStore)
  }
 
}
 
module.exports = boardList;

