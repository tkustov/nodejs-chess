var angular = require('angular');
var ngRoute = require('angular-route');
var SocketFactory = require('../socket/socket.factory');
var user = require('../user');

module.exports = angular.module('chess.chat', [
	user
]).

component('chat', {
  controller: ChatController,
  templateUrl: 'chat/chat.component.html'
});

ChatController.$inject = ['Socket', '$http', 'user', '$location'];
function ChatController(Socket, $http, user, $location){
	console.log('Chat Controller');
	var $ctrl=this;	
	$ctrl.messages=[];
	var chatSocket;

	$ctrl.getUserName = function() {
		    return (user.userInfo) 
		      ? user.userInfo.username
		      : null;
	};

	$http.get(process.env.API_URL + '/api/game/room/', {withCredentials: true})
    .then(function(response) {
    	var gameRoom = response.data.gameRoom.toString();
	    chatSocket = Socket('chat');
	    chatSocket.on('connect', function(data) {
	      chatSocket.emit('join', gameRoom);
	      console.log('connected to /chat and gameRoom'+gameRoom);
	    });

		/*chatSocket.emit('init', {
		    users: $ctrl.getUserName()
	  	});*/

	  	/*chatSocket.on('get:room', function (data) {
		  	console.log(data);
		  	$ctrl.room=data;
		});*/

		/*chatSocket.on('init', function (data) {
		    $ctrl.name = data.name;
		    $ctrl.users = data.users;
	  	});

	  	chatSocket.on('get:room', function (data) {
		  	console.log(data);
		  	$ctrl.room=data;
		});

		chatSocket.on('send:message', function (message) {
		    $ctrl.messages.push(message);
		});*/

	  	/*chatSocket.on('user:join', function (data) {
		    $ctrl.messages.push({
		      user: 'chatroom',
		      text: 'User ' + data.name + ' has joined.'
		    });
		    $ctrl.users.push(data.name);
  	  	});*/
		/*
		$ctrl.sendMessage = function () {
			console.log($ctrl.getUserName());
			
			chatSocket.emit('send:message', {    	
		      	message: $ctrl.message
			});
		    chatSocket.to($ctrl.room).emit('send:message', {    	
		      	message: $ctrl.message
			});
			/*$ctrl.messages.push({
		      user: $ctrl.name,
		      text: $ctrl.message
		    });*/
		   /* $ctrl.message = '';
		};*/
	});
}