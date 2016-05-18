var angular = require('angular');
var ngRoute = require('angular-route');
var SocketFactory = require('../socket/socket.factory');
var user = require('../user');
var GameFactory = require('../game/game.factory');

module.exports = angular.module('chess.chat', [
	user
]).
factory('Game', GameFactory).
component('chat', {
	controller: ChatController,
  templateUrl: 'chat/chat.component.html'
});

ChatController.$inject = ['Socket', '$http', 'user', 'Game', '$location', '$scope'];
function ChatController(Socket, $http, user, Game, $location, $scope){
	var ctrl=this;	
	ctrl.messages=[];
	var chatSocket;
	var elem = document.getElementById('chatbody');
	var msgbox = document.getElementById('message_box');

	ctrl.getUserName = function() {
		return (user.userInfo) 
		? user.userInfo.username
		: null;
	};

	var gameId=Game.getGameId();

	
  $http.get(process.env.API_URL + '/api/game/messages/' + gameId, {withCredentials: true}).
      then(function(response) {
        ctrl.messages = response.data.chat;
  });
 

	$http.get(process.env.API_URL + '/api/game/gameroom'+ gameId, {withCredentials: true})
    .then(function(response) {
    	var gameRoom = response.data["game room"];
	    chatSocket = Socket('chat');
	    
	    chatSocket.on('connect', function(data) {
	      chatSocket.emit('join', gameRoom);
	    });

			chatSocket.on('send:message', function (message) {
			  ctrl.messages.push(message);
			  ctrl.gotoBottom();
			});

			ctrl.gotoBottom = function() {
				elem.scrollTop = elem.scrollHeight - elem.clientHeight;
			};
		
			ctrl.sendMessage = function () {	
				if(ctrl.message != '' || ctrl.message != undefined){
					var sender=ctrl.getUserName();
				    chatSocket.emit('send:message', {
				    	who: sender,
				      message: ctrl.message
					});
			  }
			  ctrl.message = '';
			};
			$scope.$on('userLoggedOut', function(){
		    chatSocket.disconnect();
		    console.log('disconnected from "game" namespace');
	  	});
	});
}