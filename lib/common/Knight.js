var Piece = require('./Piece');
var board = require('./Board');
var _ = require('lodash');

function Knight(board, color, position) {
  Piece.apply(this, [board, color, position,
    [{i:2,j:1},{i:2,j:-1},{i:-2,j:1},{i:-2,j:-1},
      {i:1,j:2},{i:1,j:-2},{i:-1,j:2},{i:-1,j:-2}],true]);
      this.name = "Knight";
}

Knight.prototype = _.extend(Object.create(Piece.prototype), {
  constructor: Knight
});

module.exports = Knight;
