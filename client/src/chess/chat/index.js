var angular = require('angular');
var ngRoute = require('angular-route');

module.exports = angular.module('chess.chat', [
  ngRoute
]).
component('chat', {
  controller: ChatController,
  templateUrl: 'chat/chat.component.html'
});

function ChatController(){
	
}