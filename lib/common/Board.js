var Piece = require('./Piece');
var Pawn = require('./Pawn');
var Rook = require('./Rook');
var Bishop = require('./Bishop');
var Queen = require('./Queen');
var King = require('./King');
var Knight = require('./Knight');

function Board() {
  this.boardInfo = [];
  this.pieces = {
    'a1': new Rook(this, 'white', 'a1'),
    'b1': new Knight(this, 'white', 'b1'),
    'c1': new Bishop(this, 'white', 'c1'),
    'd1': new Queen(this, 'white', 'd1'),
    'e1': new King(this, 'white', 'e1'),
    'f1': new Bishop(this, 'white', 'f1'),
    'g1': new Knight(this, 'white', 'g1'),
    'h1': new Rook(this, 'white', 'h1'),
    'h2': new Pawn(this, 'white', 'h2'),
    'g2': new Pawn(this, 'white', 'g2'),
    'f2': new Pawn(this, 'white', 'f2'),
    'e2': new Pawn(this, 'white', 'e2'),
    'd2': new Pawn(this, 'white', 'd2'),
    'c2': new Pawn(this, 'white', 'c2'),
    'b2': new Pawn(this, 'white', 'b2'),
    'a2': new Pawn(this, 'white', 'a2'),
    'a7': new Pawn(this, 'black', 'a7'),
    'b7': new Pawn(this, 'black', 'b7'),
    'c7': new Pawn(this, 'black', 'c7'),
    'd7': new Pawn(this, 'black', 'd7'),
    'e7': new Pawn(this, 'black', 'e7'),
    'f7': new Pawn(this, 'black', 'f7'),
    'g7': new Pawn(this, 'black', 'g7'),
    'h7': new Pawn(this, 'black', 'h7'),
    'h8': new Rook(this, 'black', 'h8'),
    'g8': new Knight(this, 'black', 'g8'),
    'f8': new Bishop(this, 'black', 'f8'),
    'e8': new King(this, 'black', 'e8'),
    'd8': new Queen(this, 'black', 'd8'),
    'c8': new Bishop(this, 'black', 'c8'),
    'b8': new Knight(this, 'black', 'b8'),
    'a8': new Rook(this, 'black', 'a8')
  }
}

Board.prototype = {
  move: function(form, to) {
    var posMoves = this.getMoves(form);
    if (posMoves.length == 0) {
      return false;
    }
    for (var i = 0; i < posMoves.length; i++) {
      if (posMoves[i] === to) {
        this.pieces[form].move(form, to);
        var color = this.pieces[to].color;
        if (color == 'black') {
          color = 'white';
        } else {
          color = 'black';
        }
        return true;
      }
    }
    return false;
  },

  findKing: function(color) {
    for (var p in this.pieces) {
      if (this.pieces[p].color == color && this.pieces[p] instanceof King) {
        return this.pieces[p].position;
      }
    }
  },

  isCheck: function(color) {
    var kingPosition = this.findKing(color);
    for (var p in this.pieces) {
      if (this.pieces[p].color != color) {
        var lm = this.pieces[p].getMoves();
        for (var m in lm) {
          if (lm[m] == kingPosition) {
            return true;
          }
        }
      }
    }
    return false;
  },


  getGameStatus: function check(color) {
    var posMoves = false;
    for (var p in this.pieces) {
      if (this.pieces[p].color == color) {
        if (this.getMoves(p).length > 0) {
          posMoves = true;
          break;
        }
      }
    }
    if (!posMoves) {
      if (this.isCheck(color)) {
        return 'checkmate';
      } else {
        return 'stalemate';
      }
    }
    return 'playing';
  },

  tryMove: function(form, to) {
    var posMoves = this.getMoves(form);
    for (var i = 0; i < posMoves.length; i++) {
      if (posMoves[i] === to) {
        return true;
      }
    }
    return false;
  },

  getMoves: function(form) {
    if (this.pieces[form] === undefined) {
      return [];
    }

    var posMoves = this.pieces[form].getMoves();
    var out = [];
    var color = this.pieces[form].color;

    for (var i = 0; i < posMoves.length; i++) {
      var tmp = this.pieces[posMoves[i]];
      this.pieces[form].move(form, posMoves[i]);

      var willBeCheck = this.isCheck(color);

      this.pieces[posMoves[i]].move(posMoves[i], form);
      if (tmp) {
        this.pieces[posMoves[i]] = tmp;
      }

      if (!willBeCheck) {
        out.push(posMoves[i]);
      }

    }
    console.log('getMoves ',out);
    return out;
  },

  getState: function() {
    var piece;
    this.boardInfo = [];
    for (piece in this.pieces) {
      var curPiece = {};

      curPiece.name = this.pieces[piece].name.toLowerCase();
      curPiece.color = this.pieces[piece].color;
      curPiece.position = this.pieces[piece].position;
      this.boardInfo.push(curPiece);
    }
    return this.boardInfo;
  },

  setState: function(newPiece) {
    //{color:'white',position:'e2',name:'pawn'}
    //'a1':new Rook (this,'white', 'a1'),
    this.pieces = {};
    for (var i = 0; i < newPiece.length; i++) {
      switch (newPiece[i].name) {
        case 'pawn':
          this.pieces[newPiece[i].position] = new Pawn(this, newPiece[i].color, newPiece[i].position);
          break;
        case 'rook':
          this.pieces[newPiece[i].position] = new Rook(this, newPiece[i].color, newPiece[i].position);
          break;
        case 'king':
          this.pieces[newPiece[i].position] = new King(this, newPiece[i].color, newPiece[i].position);
          break;
        case 'knight':
          this.pieces[newPiece[i].position] = new Knight(this, newPiece[i].color, newPiece[i].position);
          break;
        case 'queen':
          this.pieces[newPiece[i].position] = new Queen(this, newPiece[i].color, newPiece[i].position);
          break;
        case 'bisho':
          this.pieces[newPiece[i].position] = new Bishop(this, newPiece[i].color, newPiece[i].position);
      }
    }
  },

  isOnBoard: function(coord) {
    if (coord.length > 2) return false;
    var coords = this.transform(coord);
    if ((coords.i >= 0 && coords.i <= 7) && (coords.j >= 0 && coords.j <= 7)) {
      return true;
    }
    return false;
  },

  isFreeCell: function(coord) {
    if (this.pieces[coord] === undefined) {
      return true;
    }
    return false;
  },

  isOpponentPiece: function(form, to) {
    if (this.isFreeCell(to)) {
      return false;
    } else if (this.pieces[form].color === this.pieces[to].color) {
      return false;
    }
    return true;
  },

  canMove: function(position, coord) {
    if (!this.isOnBoard(coord)) {
      return false;
    }
    if (this.isOpponentPiece(position, coord)) {
      return true;
    }
    if (this.isFreeCell(coord)) {
      return true;
    }
    return false;
  },

  transform: function(coord) {
    var newCoords = {};
    newCoords.i = -(+coord[1] - 8);
    newCoords.j = coord.toLowerCase().charCodeAt(0) - 97;
    return newCoords;
  },

  reverseTrans: function(coord) {
    var newCoords;
    newCoords = String.fromCharCode(coord.j + 97) + (8 - coord.i);
    return newCoords;
  }
};

module.exports = Board;