function Piece(board, color, position) {
  this.color = color;
  this.position = position;
  this.board = board;
}

Piece.prototype = {
  move: function (form, to) {
    this.board.pieces[to] = this.board.pieces[form];
    this.board.pieces[to].position = to;
    delete this.board.pieces[form];
  },

  getMoves: function () {
    throw new Error('this method getMoves () shoul be inmplemented in child class');
  }
};

module.exports = Piece;
