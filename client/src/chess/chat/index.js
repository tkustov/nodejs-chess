var angular = require('angular');
var ngRoute = require('angular-route');
var SocketFactory = require('../socket/socket.factory');

module.exports = angular.module('chess.chat', [
]).

component('chat', {
  controller: ChatController,
  templateUrl: 'chat/chat.component.html'
});

function ChatController(){
	console.log('Chat Controller');
	var $ctrl=this;
	$ctrl.name="Hello";	
}