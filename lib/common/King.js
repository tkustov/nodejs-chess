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
      else if(this.board.isOpponentPiece(this.position, coord)){
        return true;
      }
    }
    return false;
  },
  canMoveStraight: function canMove(allMoves,dj,di) {
    var coordStart = this.board.transform(this.position);
    
    var coordEnd = {};
    coordEnd.j = coordStart.j;
    coordEnd.i = coordStart.i;
    coordEnd.j += dj;
    coordEnd.i += di;
    
    coordEnd = this.board.reverseTrans(coordEnd);
    if(this.canMove(coordEnd))
      allMoves.push(coordEnd);
  },

  getMoves: function getMoves() {
    var allMoves = [];
    this.canMoveStraight(allMoves,1,0);
    this.canMoveStraight(allMoves,-1,0);
    this.canMoveStraight(allMoves,0,1);
    this.canMoveStraight(allMoves,0,-1);
    this.canMoveStraight(allMoves,1,1);
    this.canMoveStraight(allMoves,-1,1);
    this.canMoveStraight(allMoves,1,-1);
    this.canMoveStraight(allMoves,-1,-1);
    return allMoves;
  }
});

module.exports = King;