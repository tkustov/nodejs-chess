var angular = require('angular');
var auth = require('../auth');

module.exports = angular.module('chess.navbar', [
  auth.name
]).
component('navbar', {
  controller: NavbarController,
  templateUrl: 'navbar/navbar.component.html'
});

NavbarController.$inject = ['auth', '$location'];
function NavbarController(auth, $location) {
  var $ctrl = this;

  $ctrl.logout = logout;

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
