var angular = require('angular');
var ngRoute = require('angular-route');
var user = require('../user');
var GameFactory = require('../game/game.factory');



module.exports = angular.module('chess.gamelog', [
	user
]).
factory('Game', GameFactory).

component('gamelog', {
  controller: GamelogController,
  templateUrl: 'gamelog/gamelog.component.html'
});

GamelogController.$inject = ['user', 'Game', '$scope'];
function GamelogController(user, Game, $scope) {
	var $ctrl = this;
  $ctrl.moves = [];
  var gameInfo = Game.getGameInfo()

  $scope.$watch(Game.getFactoryMoves, function (moves) {
    $ctrl.moves = moves;
  }, true);

}
