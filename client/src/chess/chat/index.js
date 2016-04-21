var angular = require('angular');
var ngRoute = require('angular-route');
var SocketFactory = require('../socket/socket.factory');

module.exports = angular.module('chess.chat', [
	/*.value('messageFormatter', function(date, message) {
    return date.toLocaleTimeString() + ' - ' + 
           //nick + ' - ' + 
           message + '\n';
       }*/
]).

//factory('Socket', SocketFactory);

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
	      console.log('connected to /game and userRoom');
	    });
	    /////////////////////////////////////////////////////
		//////////////////////////////////////////////////////
		/////////////////////////////////////////////////////
		/*chatSocket.on('init', function (data) {
		    $ctrl.name = data.name;
		    $ctrl.users = data.users;
	  	});*/

		chatSocket.on('send:message', function (message) {
			console.log("from server"+message.text);
			$ctrl.chatmessages=message.text+"\n";
		    //$ctrl.messages.push(message);
		});

	  	/*chatSocket.on('user:join', function (data) {
		    $ctrl.messages.push({
		      user: 'chatroom',
		      text: 'User ' + data.name + ' has joined.'
		    });
		    $ctrl.users.push(data.name);
  	  	});*/
		
		$ctrl.sendMessage = function () {
			var msg=$ctrl.message;
	  	  	console.log("SendMessageFunc");
	  	  	console.log("message="+ msg);
		    chatSocket.emit('send:message', {    	
		      	message: msg
			});
			$ctrl.messages.push({
		      user: $ctrl.name,
		      text: $ctrl.message
		    });
		    $ctrl.message = '';
		};
	});
}