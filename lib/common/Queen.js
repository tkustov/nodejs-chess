var Board = require('./Board');
var Piece = require('./Piece');
var board = require('./Board');
var _ = require('lodash');

function Queen(board, color, position) {
  Piece.apply(this, [board, color, position]);
};

Queen.prototype = _.extend(Object.create(Piece.prototype), {

  constructor: Queen,

  canMove: function canMove(direction) {
    var direction = this.board.reverseTrans(direction);
    if (this.board.isOnBoard(direction)) {
      if (this.board.isFreeCell(direction)) {
        return true;
      }
      else if (this.board.isOpponentPiece(this.position,direction)) {
        return true;
      }
    }
    return false;
  },

  getMoves: function getMoves() {
    var coordinates = this.board.transform(this.position);
    var straightRight = {};
    var straightLeft = {};
    var downRight = {};
    var downLeft = {};
    var straight = {};
    var left = {};
    var right = {};
    var down = {};
    var i = 1;
    var j = 1;
    var k = 1;
    var l = 1;
    var o = 1;
    var p = 1;
    var r = 1;
    var s = 1;
    straightRight.j = coordinates.j+1;
    straightRight.i = coordinates.i+1;
    straightLeft.j = coordinates.j-1;
    straightLeft.i = coordinates.i+1;
    downRight.j = coordinates.j+1;
    downRight.i = coordinates.i-1;
    downLeft.j = coordinates.j-1;
    downLeft.i = coordinates.i-1;
    straight.j = coordinates.j;
    straight.i = coordinates.i+1;
    left.j = coordinates.j-1;
    left.i = coordinates.i;
    right.j = coordinates.j+1;
    right.i = coordinates.i;
    down.j = coordinates.j;
    down.i = coordinates.i-1;
    var possibleMoves = [];
    while (this.canMove(straight)) {
      var str = this.board.reverseTrans(straight);
      if (this.board.isOpponentPiece(this.position,str)) {
        possibleMoves.push(str);
        break;
      }
      possibleMoves.push(str);
      o++;
      straight.i = coordinates.i+o;
    }
    while (this.canMove(left)) {
      var lf = this.board.reverseTrans(left);
      if (this.board.isOpponentPiece(this.position,lf)) {
        possibleMoves.push(lf);
        break;
      }
      possibleMoves.push(lf);
      p++;
      left.j = coordinates.j-p;
    }
    while (this.canMove(right)) {
      var ri = this.board.reverseTrans(right);
      if (this.board.isOpponentPiece(this.position,ri)) {
        possibleMoves.push(ri);
        break;
      }
      possibleMoves.push(ri);
      r++;
      right.j = coordinates.j+r;
    }
    while (this.canMove(down)) {
      var dow = this.board.reverseTrans(down);
      if (this.board.isOpponentPiece(this.position,dow)) {
        possibleMoves.push(dow);
        break;
      }
      possibleMoves.push(dow);
      s++;
      down.i = coordinates.i-s;
    }
    while (this.canMove(straightRight)) {
      var straightR = this.board.reverseTrans(straightRight);
      if (this.board.isOpponentPiece(this.position,straightR)) {
        possibleMoves.push(straightR);
        break;
      }
      possibleMoves.push(straightR);
      i++;
      straightRight.j = coordinates.j+i;
      straightRight.i = coordinates.i+i;
    }
    while (this.canMove(straightLeft)) {
      var straightL = this.board.reverseTrans(straightLeft);
      if (this.board.isOpponentPiece(this.position,straightL)) {
        possibleMoves.push(straightL);
        break;
      }
      possibleMoves.push(straightL);
      j++;
      straightLeft.j = coordinates.j-j;
      straightLeft.i = coordinates.i+j;
    }
    while (this.canMove(downRight)) {
      var downR = this.board.reverseTrans(downRight);
      if (this.board.isOpponentPiece(this.position,downR)) {
        possibleMoves.push(downR);
        break;
      }
      possibleMoves.push(downR);
      k++;
      downRight.j = coordinates.j+k;
      downRight.i = coordinates.i-k;
    }
    while (this.canMove(downLeft)) {
      var downL = this.board.reverseTrans(downLeft);
      if (this.board.isOpponentPiece(this.position,downL)) {
        possibleMoves.push(downL);
        break;
      }
      possibleMoves.push(downL);
      l++;
      downLeft.j = coordinates.j-l;
      downLeft.i = coordinates.i-l;
    }
    return possibleMoves;
  }});

module.exports = Queen;