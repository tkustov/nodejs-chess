var Board = require('./Board');
var Piece = require('./Piece');
var board = require('./Board');
var _ = require('lodash');

function Rook(board, color, position) {
  Piece.apply(this, [board, color, position]);
};

Rook.prototype = _.extend(Object.create(Piece.prototype), {

  constructor: Rook,

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
    var i = coordStart.i;
    var j = coordStart.j;
    i--;
    var coordEnd = {};
    coordEnd.j = j;
    coordEnd.i = i;
    var allMoves = [];
    //straight moves
    coordEnd = this.board.reverseTrans(coordEnd);
    while(this.canMove(coordEnd)) {
      allMoves.push(coordEnd);
      coordEnd = this.board.transform(coordEnd);
      i--;
      coordEnd.i = i;
      coordEnd.j = j;
      coordEnd = this.board.reverseTrans(coordEnd);
      if (this.board.isOpponentPiece(this.position, coordEnd)) {
        allMoves.push(coordEnd);
        break;
      }
    };

    //back moves
    coordEnd = this.board.transform(coordEnd);
    i = coordStart.i + 1;
    coordEnd.i = i;
    coordEnd = this.board.reverseTrans(coordEnd);
    while(this.canMove(coordEnd)) {
      allMoves.push(coordEnd);
      coordEnd = this.board.transform(coordEnd);
      i++;
      coordEnd.i = i;
      coordEnd.j = j;
      coordEnd = this.board.reverseTrans(coordEnd);
      if (this.board.isOpponentPiece(this.position, coordEnd)) {
        allMoves.push(coordEnd);
        break;
      }
    };

    //right moves
    coordEnd = this.board.transform(coordEnd);
    i = coordStart.i;
    j = coordStart.j + 1;
    coordEnd.i = i;
    coordEnd.j = j;
    coordEnd = this.board.reverseTrans(coordEnd);
    while(this.canMove(coordEnd)) {
      allMoves.push(coordEnd);
      coordEnd = this.board.transform(coordEnd);
      j++;
      coordEnd.i = i;
      coordEnd.j = j;
      coordEnd = this.board.reverseTrans(coordEnd);
      if (this.board.isOpponentPiece(this.position, coordEnd)) {
        allMoves.push(coordEnd);
        break;
      }
    };

    //left moves
    coordEnd = this.board.transform(coordEnd);
    i = coordStart.i;
    j = coordStart.j - 1;
    coordEnd.i = i;
    coordEnd.j = j;
    coordEnd = this.board.reverseTrans(coordEnd);
    while(this.canMove(coordEnd)) {
      allMoves.push(coordEnd);
      coordEnd = this.board.transform(coordEnd);
      j--;
      coordEnd.i = i;
      coordEnd.j = j;
      coordEnd = this.board.reverseTrans(coordEnd);
      if (this.board.isOpponentPiece(this.position, coordEnd)) {
        allMoves.push(coordEnd);
        break;
      }
    };

    return allMoves;
  }
});

module.exports = Rook;