
var Board = require("../lib/common/Board.js");
var assert = require('assert');
var board = new Board();

describe("Board methods", function(){
 	
 	it('test isOnBoard method', function (){
 		assert.equal(true, board.isOnBoard('e2'));
 		assert.equal(true, board.isOnBoard('e1'));
 		assert.equal(false, board.isOnBoard('a0'));
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
 	it('test getMoves method', function (){
 		assert.deepEqual(['e3','e4'], board.getMoves('e2'));
 	});
 	
});


/*
import Lexer from '../../src/lexer';
import { string } from '../../src/lexic';

let assert = require('assert');
let lex = Lexer([string]);

describe('Lexic: strings', () => {
  it('should handle empty strings', () => {
    assert.equal('', lex('""')[0].value);
    assert.equal('', lex("''")[0].value);
  });

  it('should handle escaped quotemark', () => {
    assert.equal("'escaped'", lex("'\\'escaped\\''")[0].value);
    assert.equal('"escaped"', lex('"\\"escaped\\""')[0].value);
  });
});*/