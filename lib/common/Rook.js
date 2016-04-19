var Board = require('./Board');
var Piece = require('./Piece');
var board = require('./Board');
var _ = require('lodash');

function Rook(board, color, position) {
  Piece.apply(this, [board, color, position]);
};

Rook.prototype = _.extend(Object.create(Piece.prototype), {

  constructor: Rook,

  canMove: function canMove(coord) {
    if (this.board.isOnBoard(coord)){
      if(this.board.isFreeCell(coord)) {
        return true;
      }
      else if(this.board.isOpponentPiece(this.position, coord)) {
        return true;
      }
    }
    return false;
  },

  canMoveStraight: function canMove(allMoves,check,dj,di) {
    var coordStart = this.board.transform(this.position);
    
    var coordEnd = {};
    coordEnd.j = coordStart.j;
    coordEnd.i = coordStart.i;
    coordEnd.j += dj;
    coordEnd.i += di;
    
    
    coordEnd = this.board.reverseTrans(coordEnd);
    while(this.canMove(coordEnd)) {

      if(check){
        if(!this.board.check(this.color,this.position,coordEnd)){
            allMoves.push(coordEnd);
          }
        }
        else{
          allMoves.push(coordEnd);
        }

      coordEnd = this.board.transform(coordEnd);
      coordEnd.j += dj;
      coordEnd.i += di;
      coordEnd = this.board.reverseTrans(coordEnd);
      if (this.board.isOpponentPiece(this.position, coordEnd)) {
        if(check){
          if(!this.board.check(this.color,this.position,coordEnd)){
            allMoves.push(coordEnd);
          }
        }
        else{
          allMoves.push(coordEnd);
        }
        
        break;
      }
    };
  },


  getMoves: function getMoves(check) {
    var allMoves = [];
    this.canMoveStraight(allMoves,check,1,0);
    this.canMoveStraight(allMoves,check,-1,0);
    this.canMoveStraight(allMoves,check,0,1);
    this.canMoveStraight(allMoves,check,0,-1);
    return allMoves;
  }
});

module.exports = Rook;