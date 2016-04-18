var Board = require('./Board');
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

  getMoves: function getMoves(check) {
    var coordinates = this.board.transform(this.position);
    var straightRight = {};
    var straightLeft = {};
    var downRight = {};
    var downLeft = {};
    var i = 1;
    var j = 1;
    var k = 1;
    var l = 1;
    straightRight.j = coordinates.j+1;
    straightRight.i = coordinates.i+1;
    straightLeft.j = coordinates.j-1;
    straightLeft.i = coordinates.i+1;
    downRight.j = coordinates.j+1;
    downRight.i = coordinates.i-1;
    downLeft.j = coordinates.j-1;
    downLeft.i = coordinates.i-1;
    var possibleMoves = [];
    while (this.canMove(straightRight)) {
      var straightR= this.board.reverseTrans(straightRight);
      if (this.board.isOpponentPiece(this.position,straightR)) {
        if(check){
          if(!this.board.check(this.color,this.position,straightR)){
            possibleMoves.push(straightR);
          }
        }
        else{
          possibleMoves.push(straightR);
          
        }
        break;
      }
        if(check){
          if(!this.board.check(this.color,this.position,straightR)){
            possibleMoves.push(straightR);
          }
        }
        else{
          possibleMoves.push(straightR);          
        }

//      possibleMoves.push(straightR);
      i++;
      straightRight.j = coordinates.j+i;
      straightRight.i = coordinates.i+i;
    }


    while (this.canMove(straightLeft)) {
      var straightL = this.board.reverseTrans(straightLeft);
      if (this.board.isOpponentPiece(this.position,straightL)) {
        if(check){
          if(!this.board.check(this.color,this.position,straightL)){
            possibleMoves.push(straightL);
          }
        }
        else{
          possibleMoves.push(straightL);
          
        }
        break;
      }
        if(check){
          if(!this.board.check(this.color,this.position,straightL)){
            possibleMoves.push(straightL);
          }
        }
        else{
          possibleMoves.push(straightL);          
        }
      
      j++;
      straightLeft.j = coordinates.j-j;
      straightLeft.i = coordinates.i+j;

    }
    while (this.canMove(downRight)) {
      var downR = this.board.reverseTrans(downRight);
      if (this.board.isOpponentPiece(this.position,downR)) {
        if(check){
          if(!this.board.check(this.color,this.position,downR)){
            possibleMoves.push(downR);
          }
        }
        else{
          possibleMoves.push(downR);
          
        }
        break;
      }
        if(check){
          if(!this.board.check(this.color,this.position,downR)){
            possibleMoves.push(downR);
          }
        }
        else{
          possibleMoves.push(downR);          
        }
      
      k++;
      downRight.j = coordinates.j+k;
      downRight.i = coordinates.i-k;
    }
    while (this.canMove(downLeft)) {
      var downL = this.board.reverseTrans(downLeft);
      if (this.board.isOpponentPiece(this.position,downL)) {
      if(check){
          if(!this.board.check(this.color,this.position,downL)){
            possibleMoves.push(downL);

          }
        }
        else{
          possibleMoves.push(downL);
        }
        break;
      }
        if(check){
          if(!this.board.check(this.color,this.position,downL)){
            possibleMoves.push(downL);
          }
        }
        else{
          possibleMoves.push(downL);          
        }
      l++;
      downLeft.j = coordinates.j-l;
      downLeft.i = coordinates.i-l;

    }
    if(check){console.log('bishop',possibleMoves);}
    return possibleMoves;
  }
});

module.exports = Bishop;