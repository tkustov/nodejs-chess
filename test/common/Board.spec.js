
var Board = require("../../lib/common/Board.js");

var assert = require('chai').assert;

var board = new Board();

describe("Board methods", function(){
 	
 	it('test isOnBoard method', function (){
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
 		assert.equal(false, board.isOpponentPiece('e2','e4'));
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

 		board.pieces['e2'].move('e2','e4');
 		assert.sameMembers([], board.getMoves('e2'));
 		assert.sameMembers(['e5'], board.getMoves('e4'));

 		board.pieces['d7'].move('d7','d5');
 		assert.sameMembers(['d5','e5'], board.getMoves('e4'));
		
		board = new Board();
 		board.pieces['e2'].move('e2','e3');
 		board.pieces['c7'].move('c7','c5');
 		board.pieces['e3'].move('e3','e4');
 		board.pieces['d8'].move('d8','a5');
 		assert.sameMembers([], board.getMoves('d2'));


 	});	
 	it('test knight getMoves method', function (){
		board = new Board();
 		assert.sameMembers(['a3','c3'], board.getMoves('b1'));
 		board.pieces['b1'].move('b1','c3');
 		board.pieces['c7'].move('c7','c5');
 		board.pieces['d2'].move('d2','d4');
 		board.pieces['d8'].move('d8','a5');
 		assert.sameMembers([], board.getMoves('c3'));
 	});
 	it('test checkmate', function (){
		board = new Board();
 		board.pieces['e2'].move('e2','e4');
 		board.pieces['f1'].move('f1','c4');
 		board.pieces['d1'].move('d1','f3');
 		board.pieces['f3'].move('f3','f7');
 		assert.equal('checkmate', board.isGameStatus('black'));

 				
 		board.setState([{color:'black',position:'a8',name:'king'},
    				{color:'white',position:'b6',name:'queen'}]);
 				
 		assert.equal('stalemate', board.isGameStatus('black'));
 		board.pieces['b6'].move('b6','b5');
 		assert.equal('playing', board.isGameStatus('black'));
 	});		

});


