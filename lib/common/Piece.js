var Board = require('./Board');
var board = require('./Board');

function Piece(board, color, position) {
  this.color = color;
  this.position = position;
  this.board = board;
}

Piece.prototype = {
  move: function move() {
      throw new Error('this method move () shoul be inmplemented in child class');
    },

  canMove: function canMove() {
    throw new Error('this method canMove () shoul be inmplemented in child class');
  },

  getMoves: function getMoves() {
    throw new Error('this method getMoves () shoul be inmplemented in child class');
  }
};

module.exports = Piece;