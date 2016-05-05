var angular = require('angular');
var ngRoute = require('angular-route');
var SocketFactory = require('../socket/socket.factory');
var user = require('../user');
var GameFactory = require('../game/game.factory');

module.exports = angular.module('chess.gamelog', [
	user
]).
factory('Game', GameFactory).
component('gamelog', {
  controller: GameLogController,
  templateUrl: 'gamelog/gamelog.component.html'
});

GameLogController.$inject = ['Socket', '$http', 'user', 'Game'];
function GameLogController(Socket, $http, user, Game){
	var $ctrl = this;
	$ctrl.moves = [];
	//var elem = document.getElementById('chatbody');

	$ctrl.getUserName = function() {
		    return (user.userInfo)
		      ? user.userInfo.username
		      : null;
	};

	//var gameId=Game.getGameId();

	// $http.get(process.env.API_URL + '/api/game/gameroom'+ gameId, {withCredentials: true})
  //   .then(function(response) {
  //   	var gameRoom = response.data["game room"];
	//     chatSocket = Socket('chat');
  //
	//     chatSocket.on('connect', function(data) {
	//       chatSocket.emit('join', gameRoom);
	//     });
  //
	// 	chatSocket.on('send:message', function (message) {
	// 	    $ctrl.messages.push(message);
	// 	    $ctrl.gotoBottom();
	// 	});

	// 	$ctrl.gotoBottom = function() {
	// 		elem.scrollTop = elem.scrollHeight - elem.clientHeight;
	// 	};
  //
	// 	$ctrl.sendMessage = function () {
	// 		var sender=$ctrl.getUserName();
	// 	    chatSocket.emit('send:message', {
	// 	    	who: sender,
	// 	      	message: $ctrl.message
	// 		});
	// 	    $ctrl.message = '';
	// 	};
	// 	$rootScope.$on('disconnectGameSocket', function(){
	//     	chatSocket.disconnect();
	//     	console.log('disconnected from "game" namespace');
  // 		});
	// });
}
