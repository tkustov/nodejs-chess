var angular = require('angular');
var ngRoute = require('angular-route');
var SocketFactory = require('../socket/socket.factory');

module.exports = angular.module('chess.chat', [
]).

component('chat', {
  controller: ChatController,
  templateUrl: 'chat/chat.component.html'
});

ChatController.$inject = ['Socket', '$http', '$location'];
function ChatController(Socket, $http, $location){
	console.log('Chat Controller');
	var $ctrl=this;
	$ctrl.name="John";	
	$ctrl.messages=[];
	var chatSocket;

	$http.get(process.env.API_URL + '/api/user/room/', {withCredentials: true})
    .then(function(response) {
	    var userRoom = response.data.userRoom.toString();
	    
	    chatSocket = Socket('chat');
	    chatSocket.on('connect', function(data) {
	      chatSocket.emit('join', userRoom);
	    });

		chatSocket.on('init', function (data) {
		    $ctrl.name = data.name;
		    $ctrl.users = data.users;
	  	});

	  	chatSocket.on('get:room', function (data) {
		  	console.log(data);
		  	$ctrl.room=data;
		});

		chatSocket.on('send:message', function (message) {
		    $ctrl.messages.push(message);
		});

	  	/*chatSocket.on('user:join', function (data) {
		    $ctrl.messages.push({
		      user: 'chatroom',
		      text: 'User ' + data.name + ' has joined.'
		    });
		    $ctrl.users.push(data.name);
  	  	});*/
		
		$ctrl.sendMessage = function () {
			chatSocket.emit('send:message', {    	
		      	message: $ctrl.message
			});
		    /*chatSocket.to($ctrl.room).emit('send:message', {    	
		      	message: $ctrl.message
			});*/
			/*$ctrl.messages.push({
		      user: $ctrl.name,
		      text: $ctrl.message
		    });*/
		    $ctrl.message = '';
		};
	});
}