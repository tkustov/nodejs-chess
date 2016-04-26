var Piece = require('./Piece');
var board = require('./Board');
var _ = require('lodash');

function King(board, color, position) {
  Piece.apply(this, [board, color, position]);
}

King.prototype = _.extend(Object.create(Piece.prototype), {

  constructor: King,

  canMoveStraight: function (allMoves,dj,di) {
    var coordStart = this.board.transform(this.position);

    var coordEnd = {};
    coordEnd.j = coordStart.j;
    coordEnd.i = coordStart.i;
    coordEnd.j += dj;
    coordEnd.i += di;

    coordEnd = this.board.reverseTrans(coordEnd);
    if(this.board.canMove(this.position,coordEnd))
      allMoves.push(coordEnd);
  },

  getMoves: function () {
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
