var Piece = require('./Piece');
var board = require('./Board');
var _ = require('lodash');

function Pawn(board, color, position) {
  Piece.apply(this, [board, color, position, [], true]);
  this.name = 'Pawn';
}

Pawn.prototype = _.extend(Object.create(Piece.prototype), {
  constructor: Pawn,

  canMove: function(straight, to) {
    if (straight) {
      if (this.board.isOnBoard(this.board.reverseTrans(to)) &&
        this.board.isFreeCell(this.board.reverseTrans(to))) {
        return true;
      } else {
        return false;
      }
    } else {
      if (!this.board.isOnBoard(this.board.reverseTrans(to))) {
        return false;
      }
      if (this.board.isOpponentPiece(this.position, this.board.reverseTrans(to))) {
        return true;
      }
    }
    return false;
  },

  getMoves: function() {
    var coor = this.board.transform(this.position);
    var direction;
    var start;
    if (this.color == 'white') {
      direction = -1;
      start = 6;
    } else {
      direction = 1;
      start = 1;
    }

    var lm = [];
    var newCoor = {};

    newCoor.i = coor.i + direction;
    newCoor.j = coor.j;

    if (this.canMove(true, newCoor)) {
      lm.push(this.board.reverseTrans(newCoor));
      if (coor.i == start) {
        newCoor.i += direction;
        if (this.canMove(true, newCoor)) {
          lm.push(this.board.reverseTrans(newCoor));
        }
      }
    }

    newCoor.i = coor.i + direction;
    newCoor.j = coor.j - 1;
    if (this.canMove(false, newCoor)) {
      lm.push(this.board.reverseTrans(newCoor));
    }
    newCoor.i = coor.i + direction;
    newCoor.j = coor.j + 1;

    if (this.canMove(false, newCoor)) {
      lm.push(this.board.reverseTrans(newCoor));
    }
    return lm;
  }
});

module.exports = Pawn;