
var Board = require("../../lib/common/Board.js");

var assert = require('chai').assert;

var board = new Board();

describe("Board methods", function(){

  it('test move method', function (){
    assert.equal(true, board.move('a2','a4'));
    assert.equal(false, board.move('a4','a2'));
  });

  it('test findKing method', function (){
    assert.equal('e1', board.findKing('white'));
    assert.equal('e8', board.findKing('black'));
  });

  it('test isCheck method', function (){
    assert.equal(false, board.isCheck('white'));
    assert.equal(false, board.isCheck('black'));
    board.setState([{color:'black',position:'a8',name:'king'},
        {color:'white',position:'a5',name:'queen'}]);
    assert.equal(true, board.isCheck('black'));
  });

  it('test getGameStatus method' , function (){
    board = new Board();
    board.move('e2','e4');
    board.move('f1','c4');
    board.move('d1','f3');
    board.move('f3','f7');
    assert.equal('checkmate', board.getGameStatus('black'));


    board.setState([{color:'black',position:'a8',name:'king'},
            {color:'white',position:'b6',name:'queen'}]);

    assert.equal('stalemate', board.getGameStatus('black'));
    board.move('b6','b5');
    assert.equal('playing', board.getGameStatus('black'));
  });

  it('test tryMove method', function (){
  	board = new Board();
    assert.equal(true, board.tryMove('a2','a4'));
    assert.equal(false, board.tryMove('a4','a2'));
  });


  it('test getState method', function (){

    board.setState([{color:'black',position:'a8',name:'king'},
        {color:'white',position:'a5',name:'queen'}]);
    assert.sameDeepMembers([{name:'king',color:'black',position:'a8'},
    	{name:'queen',color:'white',position:'a5'}], board.getState());
  });

  it('test isOnBoard method', function (){
  	board = new Board();
    assert.equal(true, board.isOnBoard('e2'));
    assert.equal(true, board.isOnBoard('e1'));
    assert.equal(false, board.isOnBoard('a0'));
    assert.equal(false, board.isOnBoard('e10'));
  });

  it('test isFreeCell method', function (){
    assert.equal(false, board.isFreeCell('e2'));
    assert.equal(true, board.isFreeCell('e5'));
    assert.equal(true, board.isFreeCell('a3'));
  });

  it('test isOpponentPiece method', function (){
    assert.equal(false,board.isOpponentPiece('e2','e4'));
    assert.equal(true, board.isOpponentPiece('e2','e7'));
    assert.equal(true, board.isOpponentPiece('a8','h2'));
  });

  it('test transform method', function (){
    assert.deepEqual({i:1,j:0}, board.transform('a7'));
  });

  it('test reverseTrans method', function (){
    assert.deepEqual('a7', board.reverseTrans({i:1,j:0}));
  });


  it('test pawn getMoves method', function (){
    board = new Board();
    assert.sameMembers(['e3','e4'], board.getMoves('e2'));
    assert.sameMembers([], board.getMoves('e3'));

    board.move('e2','e4');
    assert.sameMembers([], board.getMoves('e2'));
    assert.sameMembers(['e5'], board.getMoves('e4'));

    board.move('d7','d5');
    assert.sameMembers(['d5','e5'], board.getMoves('e4'));

    board = new Board();
    board.move('e2','e3');
    board.move('c7','c5');
    board.move('e3','e4');
    board.move('d8','a5');
    assert.sameMembers([], board.getMoves('d2'))
  });

  it('test knight getMoves method', function (){
    board = new Board();
    assert.sameMembers(['a3','c3'], board.getMoves('b1'));
    board.move('b1','c3');
    board.move('c7','c5');
    board.move('d2','d4');
    board.move('d8','a5');
    assert.sameMembers([], board.getMoves('c3'));
  });

  it('test rook getMoves method', function (){
    board = new Board();
    assert.sameMembers([], board.getMoves('a1'));
    board.move('a2','a4');
    assert.sameMembers(['a2','a3'], board.getMoves('a1'));
  });

  it('test king getMoves method', function (){
    board = new Board();
    assert.sameMembers([], board.getMoves('e1'));
    board.move('e2','e4');
    assert.sameMembers(['e2'], board.getMoves('e1'));
  });

  it('test bishop getMoves method', function (){
    board = new Board();
    assert.sameMembers([], board.getMoves('f1'));
    board.move('e2','e4');
    board.move('c2','c4');
    assert.sameMembers(['e2','d3'], board.getMoves('f1'));
  });

  it('test queen getMoves method', function (){
    board = new Board();
    assert.sameMembers([], board.getMoves('d1'));
    board.move('e2','e4');
    board.move('g2','g4');
    assert.sameMembers(['e2','f3'], board.getMoves('d1'));
  });

});
