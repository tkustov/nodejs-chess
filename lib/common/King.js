var Board = require('./Board');
var Piece = require('./Piece');
var board = require('./Board');
var _ = require('lodash');

function King(board, color, position) {
  Piece.apply(this, [board, color, position]);
}

King.prototype = _.extend(Object.create(Piece.prototype), {
  
  constructor: King,

  canMove: function canMove(coord) {
    if (this.board.isOnBoard(coord)){
      if(this.board.isFreeCell(coord)) {
        return true;
      }
      else {
        return false;
      }
    }
    if(this.board.isOpponentPiece(this.position, coord)) {
      return true;
    }
    return false;
  },

  getMoves: function getMoves() {
    var coordStart = this.board.transform(this.position);
    var allMoves = [];
    var coordEnd = {};

    //straight move
    coordEnd.i = coordStart.i - 1;
    coordEnd.j = coordStart.j;
    coordEnd = this.board.reverseTrans(coordEnd);
    if (this.canMove(coordEnd)){
      allMoves.push(coordEnd);
    }

    //back move
    coordEnd = this.board.transform(coordEnd);
    coordEnd.i = coordStart.i + 1;
    coordEnd.j = coordStart.j;
    coordEnd = this.board.reverseTrans(coordEnd);
    if (this.canMove(coordEnd)){
      allMoves.push(coordEnd);
    }

    //right move
    coordEnd = this.board.transform(coordEnd);
    coordEnd.i = coordStart.i;
    coordEnd.j = coordStart.j + 1;
    coordEnd = this.board.reverseTrans(coordEnd);
    if (this.canMove(coordEnd)){
      allMoves.push(coordEnd);
    }

    //left move
    coordEnd = this.board.transform(coordEnd);
    coordEnd.i = coordStart.i;
    coordEnd.j = coordStart.j - 1;
    coordEnd = this.board.reverseTrans(coordEnd);
    if (this.canMove(coordEnd)){
      allMoves.push(coordEnd);
    }

    //straight-right move
    coordEnd = this.board.transform(coordEnd);
    coordEnd.i = coordStart.i - 1;
    coordEnd.j = coordStart.j + 1;
    coordEnd = this.board.reverseTrans(coordEnd);
    if (this.canMove(coordEnd)) {
      allMoves.push(coordEnd);
    }

    //straight-left move
    coordEnd = this.board.transform(coordEnd);
    coordEnd.i = coordStart.i - 1;
    coordEnd.j = coordStart.j - 1;
    coordEnd = this.board.reverseTrans(coordEnd);
    if (this.canMove(coordEnd)) {
      allMoves.push(coordEnd);
    }

    //back-right move
    coordEnd = this.board.transform(coordEnd);
    coordEnd.i = coordStart.i + 1;
    coordEnd.j = coordStart.j + 1;
    coordEnd = this.board.reverseTrans(coordEnd);
    if (this.canMove(coordEnd)) {
      allMoves.push(coordEnd);
    }

    //back-left move
    coordEnd = this.board.transform(coordEnd);
    coordEnd.i = coordStart.i + 1;
    coordEnd.j = coordStart.j - 1;
    coordEnd = this.board.reverseTrans(coordEnd);
    if (this.canMove(coordEnd)) {
      allMoves.push(coordEnd);
    }

    return allMoves;
  }
});

module.exports = King;