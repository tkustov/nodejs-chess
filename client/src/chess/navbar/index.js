var angular = require('angular');
var auth = require('../auth');
var user = require('../user');
var PlayersRoomFactory = require('../playersRoom/playersRoom.factory');

module.exports = angular.module('chess.navbar', [
  auth,
  user
]).
component('navbar', {
  controller: NavbarController,
  templateUrl: 'navbar/navbar.component.html'
}).
factory('PlayersRoom', PlayersRoomFactory);

NavbarController.$inject = ['auth', 'user', '$location', 'PlayersRoom'];
function NavbarController(auth, user, $location, PlayersRoom) {
  var $ctrl = this;

  $ctrl.isLoggedIn = user.isLoggedIn;
  $ctrl.logout = logout;
  $ctrl.getUserName = function() {
    return (user.userInfo) 
      ? user.userInfo.username
      : null;
  };
  $ctrl.toggled = false;
  $ctrl.toggle = toggle;
  function toggle() {
    $ctrl.toggled = !$ctrl.toggled;
  }
  $ctrl.invitations = PlayersRoom.getInvitations;

  function logout() {
    auth.logout().
      then(
        function (response) {
          user.userInfo = null;
          $location.path('/')
          console.log('user logged out');
        },
        function () {
          console.log('error during logging out');
        }
      );
  }
}
