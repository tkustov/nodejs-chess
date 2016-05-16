var angular = require('angular');
var ngRoute = require('angular-route');
var GameFactory = require('./game.factory')
var user = require('../user');

module.exports = angular.module('chess.game', [
  ngRoute
]).
config(RouteConfig).
factory(GameFactory);

RouteConfig.$inject = ['$routeProvider'];
function RouteConfig($routeProvider) {
  $routeProvider.when('/game:gameId', {
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
