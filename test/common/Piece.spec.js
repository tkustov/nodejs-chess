var assert = require('assert');
var Piece = require('../../lib/common/Piece');

describe('Piece', function () {
  var piece = null;

  beforeEach(function () {
    piece = new Piece(null, 'white', 'e2');
  });

  describe('Piece.canMove()', function () {
    it('should be a function', function () {
      assert.equal(typeof piece.canMove, 'function');
    });

    it('should throws an error', function () {
      assert.throws(() => { piece.canMove(); }, Error);
    });
  });
});
