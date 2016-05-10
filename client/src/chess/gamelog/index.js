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

GamelogController.$inject = ['user', 'Game'];
function GamelogController(user, Game) {
	var $ctrl = this;
	$ctrl.moves = [];
  $scope.$watch(Game.getFactoryMoves, function (moves) {
    ctrl.moves = moves;
    console.log(ctrl.moves + ' мувси для геймлогу');
  }, true);

	$ctrl.getUserName = function() {
		    return (user.userInfo)
		      ? user.userInfo.username
		      : null;
	};
}
