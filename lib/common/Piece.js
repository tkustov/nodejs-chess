function Piece(board, color, position, straights, onemove) {
  this.color = color;
  this.position = position;
  this.board = board;
  this.straights = straights.slice();
  this.onemove = onemove;
}

Piece.prototype = {
  move: function(form, to) {
    this.board.pieces[to] = this.board.pieces[form];
    this.board.pieces[to].position = to;
    delete this.board.pieces[form];
  },

  canMoveStraight: function(possibleMoves, straight) {
    var coordinates = this.board.transform(this.position);
    var newCoordinates = {};
    newCoordinates.j = coordinates.j + straight.j;
    newCoordinates.i = coordinates.i + straight.i;

    while (this.board.canMove(this.position, this.board.reverseTrans(newCoordinates))) {
      var newPosition = this.board.reverseTrans(newCoordinates);
      possibleMoves.push(newPosition);
      if (this.board.isOpponentPiece(this.position, newPosition) || this.onemove) {
        break;
      }
      newCoordinates.j += straight.j;
      newCoordinates.i += straight.i;
    }
  },

  getMoves: function() {
    var possibleMoves = [];
    for (var i = 0; i < this.straights.length; i++) {
      this.canMoveStraight(possibleMoves, this.straights[i]);
    }
    return possibleMoves;
  }
};

module.exports = Piece;