var Piece = require('./Piece');
var board = require('./Board');
var _ = require('lodash');

function Bishop(board, color, position) {
  Piece.apply(this, [board, color, position,
    [{i:1,j:1},{i:-1,j:1},{i:1,j:-1},{i:-1,j:-1}],false]);
    this.name = "Bishop";
}

Bishop.prototype = _.extend(Object.create(Piece.prototype), {
  constructor: Bishop
});

module.exports = Bishop;
