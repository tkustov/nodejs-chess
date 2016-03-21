var Piece = require('./Piece');
var Pawn = require('./Pawn');
var Rook = require('./Rook');
var Bishop = require('./Bishop');
var Queen = require('./Queen');
var King = require('./King');
var Knight = require('./Knight');

function Board(boardInfo) {
  this.boardInfo = boardInfo;
  this.pieces = {'a1':new Rook (this,'white', 'a1'), 'b1':new Knight(this,'white', 'b1'),
    'c1': new Bishop (this,'white', 'c1'), 'd1': new Queen (this,'white', 'd1'),
    'e1': new King (this,'white', 'e1'), 'f1': new Bishop (this,'white', 'f1'),
     'g1': new Knight (this,'white', 'g1'),'h1': new Rook (this,'white', 'h1'),
    'h2': new Pawn (this,'white', 'h2'),'g2': new Pawn (this,'white', 'g2'),
    'f2': new Pawn (this,'white', 'f2'),'e2': new Pawn (this,'white', 'e2'),'d2': new Pawn (this,'white', 'd2'),
    'c2': new Pawn (this,'white', 'c2'), 'b2': new Pawn (this,'white', 'b2'),'a2': new Pawn (this,'white', 'a2'),
    'a7': new Pawn (this,'black', 'a7'), 'b7': new Pawn (this,'black', 'b7'),'c7': new Pawn (this,'black', 'c7'),
    'd7': new Pawn (this,'black', 'd7'), 'e7': new Pawn (this,'black', 'e7'),'f7': new Pawn (this,'black', 'f7'),
    'g7': new Pawn (this,'black', 'g7'),'h7': new Pawn (this,'black', 'h7'),'h8': new Rook (this,'black', 'h8'),
    'g8': new Knight (this,'black', 'g8'),'f8': new Bishop (this,'black', 'f8'),'e8': new King (this,'black', 'e8'),
    'd8': new Queen (this,'black', 'd8'), 'c8': new Bishop (this,'black', 'c8'), 'b8': new Knight (this,'black', 'b8'),
    'a8': new Rook (this,'black', 'a8')}
}

Board.prototype = {
  move: function move(form, to) {
    this.pieces[form].move(to);
  },

  getMoves: function(form) {
     if (this.pieces[form] === undefined) {
      throw new Error ('trying to move non-existent piece');
    }
      return this.pieces[form].getMoves();
  },

  isOnBoard: function isOnBoard(coord) {
    var coords = this.transform(coord);
    if ((coords.i >= 0 && coords.i <= 7)&&(coords.j >= 0 && coords.j <= 7)) {
      return true;
    }
    return false;
  },

  isFreeCell: function isFreeCell(coord) {
    if (this.pieces[coord] === undefined) {
      return true;
    }
    return false;
  },

  isOpponentPiece: function isOpponentPiece(form, to) {
    if (this.isFreeCell(to)) {
      return false;
    }
    else if (this.pieces[form].color === this.pieces[to].color) {
      return false;
    }
    return true;
  },

  transform: function transform(coord) {
    var newCoords = {};
    newCoords.i = -(+coord[1] - 8);
    newCoords.j = coord.toLowerCase().charCodeAt(0)-97;
    return newCoords;
  },

  reverseTrans: function reverseTrans(coord) {
    var newCoords;
    newCoords = String.fromCharCode(coord.j+97) + (8-coord.i);
    return newCoords;
  }
};

module.exports = Board;