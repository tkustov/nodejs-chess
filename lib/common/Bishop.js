var Piece = require('./Piece');
var board = require('./Board');
var _ = require('lodash');

function Bishop(board, color, position) {
  Piece.apply(this, [board, color, position]);
}

Bishop.prototype = _.extend(Object.create(Piece.prototype), {
  constructor: Bishop,

  canMoveStraight: function (possibleMoves,dj,di){
  var coordinates = this.board.transform(this.position);
  var straightRight = {};
  straightRight.j = coordinates.j+dj;
  straightRight.i = coordinates.i+di;

    while (this.board.canMove(this.position,this.board.reverseTrans(straightRight))) {
      var straightR= this.board.reverseTrans(straightRight);
      possibleMoves.push(straightR);
      if (this.board.isOpponentPiece(this.position,straightR)) {
        break;
      }
      straightRight.j += dj;
      straightRight.i += di;
    }
  },

  getMoves: function () {
    var possibleMoves = [];
    this.canMoveStraight(possibleMoves,1,1);
    this.canMoveStraight(possibleMoves,-1,1);
    this.canMoveStraight(possibleMoves,1,-1);
    this.canMoveStraight(possibleMoves,-1,-1);
    return possibleMoves;
  }
});

module.exports = Bishop;
