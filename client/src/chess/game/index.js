var angular = require('angular');
var ngRoute = require('angular-route');
var user = require('../user');

module.exports = angular.module('chess.game', [
  ngRoute,
  user
]).
config(RouteConfig).
factory('Game', require('./game.factory'));

RouteConfig.$inject = ['$routeProvider'];
function RouteConfig($routeProvider) {
  $routeProvider.when('/game/:gameId', {
    templateUrl: 'game/game.component.html',
    controller: GameController
  });
}

GameController.$inject= ['user', 'Game', '$routeParams'];
function GameController(user, Game, $routeParams) {
  var $ctrl = this
  $ctrl.gameId = $routeParams.gameId;
  Game.setGameId($ctrl.gameId)
}
