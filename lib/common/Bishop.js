var Piece = require('./Piece');
var board = require('./Board');
var _ = require('lodash');

function Bishop(board, color, position) {
  Piece.apply(this, [board, color, position]);
}

Bishop.prototype = _.extend(Object.create(Piece.prototype), {
  constructor: Bishop,

  canMove: function canMove(direction){
    var direction = this.board.reverseTrans(direction);
    if (this.board.isOnBoard(direction)) {
      if (this.board.isFreeCell(direction)) {
        return true;
      }
      else if (this.board.isOpponentPiece(this.position, direction)) {
        return true;
      }
    }
    return false;
  },

  canMoveStraight: function canMove(possibleMoves,dj,di){
  var coordinates = this.board.transform(this.position);
  var straightRight = {};
  straightRight.j = coordinates.j+dj;
  straightRight.i = coordinates.i+di;

    while (this.canMove(straightRight)) {
      var straightR= this.board.reverseTrans(straightRight);
      possibleMoves.push(straightR);  
      if (this.board.isOpponentPiece(this.position,straightR)) {         
        break;
      }
      straightRight.j += dj;
      straightRight.i += di;
    }
  },

  getMoves: function getMoves() {
    var possibleMoves = [];
    this.canMoveStraight(possibleMoves,1,1);
    this.canMoveStraight(possibleMoves,-1,1);
    this.canMoveStraight(possibleMoves,1,-1);
    this.canMoveStraight(possibleMoves,-1,-1);
    return possibleMoves;
  }
});

module.exports = Bishop;