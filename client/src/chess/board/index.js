var angular = require('angular');
var ngRoute = require('angular-route');
var BoardComponent = require('./board.component');
var BoardFactory = require('./board.factory');
var GameFactory = require('../game/game.factory');

module.exports = 'chess.board';

angular.module('chess.board', [
  ngRoute
]).
config(RouteConfig).
factory('Board', BoardFactory).
factory('Game', GameFactory).
component('chessCanvas', BoardComponent);

RouteConfig.$inject = ['$routeProvider'];
function RouteConfig($routeProvider) {
  $routeProvider.when('/board', {
    template: '<chess-canvas></chess-canvas>'
  });
}