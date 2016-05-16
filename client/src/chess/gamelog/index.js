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

GamelogController.$inject = ['user', 'Game', '$scope', '$q'];
function GamelogController(user, Game, $scope, $q) {
	var $ctrl = this;
  $ctrl.moves = [];
  $ctrl.color;
  $ctrl.whoMoves;
  var userInfo;
  var tmpMoves;
  $scope.$watch(Game.getFactoryMoves, function (moves, movesOld) {
    getUserInfo().then(function(prom) {
      fillMoves(moves, movesOld, prom);
    });

  }, true);

  // $scope.$watch(Game.getGameInfo, function (info) {
  //   if (userInfo._id === info.whitePlayer) {
  //     $ctrl.whoMoves = 'Yours';
  //     $ctrl.color = 'WHITE';
  //   }
  //   else if ((userInfo._id === info.blackPlayer)) {
  //     $ctrl.whoMoves = 'Opponents';
  //     $ctrl.color = 'BLACK';
  //   }
  // })

  function findColor () {
    var info = Game.getGameInfo();
      if (userInfo._id === info.whitePlayer) {
        $ctrl.whoMoves = 'Yours';
        $ctrl.color = 'WHITE';
      }
      else if ((userInfo._id === info.blackPlayer)) {
        $ctrl.whoMoves = 'Opponents';
        $ctrl.color = 'BLACK';
      }
  }

  function fillMoves (moves, movesOld, prom) {
    userInfo = prom;
    findColor();
    if (((moves.length - movesOld.length) > 1) && movesOld.length !== 0) {
      moves.pop();
    }
    if (moves.length === 0) {
      moves = Game.getFactoryMoves();
    }
    tmpMoves =  moves.map(function(item, i) {
      if (userInfo._id === Game.whitePlayer) {
        if (i === 0) {
          item.user = 'You';
          $ctrl.whoMoves = 'Opponents';
        }
        if (i & 1) {
          item.user = 'Opponent';
          $ctrl.whoMoves = 'Yours';
        }
        else {
          item.user = 'You';
          $ctrl.whoMoves = 'Opponents';
        }
      }
      else {
        if (i & 1) {
          item.user = 'You';
          $ctrl.whoMoves = 'Opponents';
        }
        else {
          item.user = 'Opponent';
          $ctrl.whoMoves = 'Yours';
        }
      }
      return item;
    });
    $ctrl.moves = tmpMoves;
  }

  function getUserInfo () {
    var promise = $q(function (resolve, reject) {
      if (user.userInfo === null) {
        user.getUserInfo().
          then(function () {
            resolve(user.userInfo);
          });
        }
        else {
          resolve(user.userInfo);
        }
    });
    return promise;
  }
}
