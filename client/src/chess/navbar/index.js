var angular = require('angular');
var auth = require('../auth');
var user = require('../user');

module.exports = angular.module('chess.navbar', [
  auth,
  user
]).
component('navbar', {
  controller: NavbarController,
  templateUrl: 'navbar/navbar.component.html'
});

NavbarController.$inject = ['auth', 'user', '$location'];
function NavbarController(auth, user, $location) {
  var $ctrl = this;

  $ctrl.logout = logout;
  $ctrl.username = user.username;
  $ctrl.toggled = false;
  $ctrl.toggle = toggle;
  //console.log($ctrl.username);
  //user.getUserName();
  function toggle() {
    $ctrl.toggled = !$ctrl.toggled;
  }

  function logout() {
    auth.logout().
      then(
        function (response) {
          $location.path('/')
          console.log('user logged out');
        },
        function () {
          console.log('error during logging out');
        }
      );
  }
}
