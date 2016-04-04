var app = angular.module('chessApp', []);
app.controller('chessController', function($scope) {

this.white = "#fff";
this.black = "#cc6600";

this.pieces = [ 
  { id: 1, name: 'rook', color: 'white', position: 'a1' },
  { id: 2, name: 'knight', color: 'white', position: 'b1' },
  { id: 3, name: 'bishop', color: 'white', position: 'c1' },
  { id: 4, name: 'queen', color: 'white', position: 'd1' },
  { id: 5, name: 'king', color: 'white', position: 'e1' },
  { id: 6, name: 'bishop', color: 'white', position: 'f1' },
  { id: 7, name: 'knight', color: 'white', position: 'g1' },
  { id: 8, name: 'rook', color: 'white', position: 'h1' },
  { id: 9, name: 'pawn', color: 'white', position: 'h2' },
  { id: 10, name: 'pawn', color: 'white', position: 'g2' },
  { id: 11, name: 'pawn', color: 'white', position: 'f2' },
  { id: 12, name: 'pawn', color: 'white', position: 'e2' },
  { id: 13, name: 'pawn', color: 'white', position: 'd2' },
  { id: 14, name: 'pawn', color: 'white', position: 'c2' },
  { id: 15, name: 'pawn', color: 'white', position: 'b2' },
  { id: 16, name: 'pawn', color: 'white', position: 'a2' },
  { id: 17, name: 'pawn', color: 'black', position: 'a7' },
  { id: 18, name: 'pawn', color: 'black', position: 'b7' },
  { id: 19, name: 'pawn', color: 'black', position: 'c7' },
  { id: 20, name: 'pawn', color: 'black', position: 'd7' },
  { id: 21, name: 'pawn', color: 'black', position: 'e7' },
  { id: 22, name: 'pawn', color: 'black', position: 'f7' },
  { id: 23, name: 'pawn', color: 'black', position: 'g7' },
  { id: 24, name: 'pawn', color: 'black', position: 'h7' },
  { id: 25, name: 'rook', color: 'black', position: 'h8' },
  { id: 26, name: 'knight', color: 'black', position: 'g8' },
  { id: 27, name: 'bishop', color: 'black', position: 'f8' },
  { id: 28, name: 'king', color: 'black', position: 'e8' },
  { id: 29, name: 'queen', color: 'black', position: 'd8' },
  { id: 30, name: 'bishop', color: 'black', position: 'c8' },
  { id: 31, name: 'knight', color: 'black', position: 'b8' },
  { id: 32, name: 'rook', color: 'black', position: 'a8' } 
];

});