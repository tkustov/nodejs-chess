var angular = require('angular');

module.exports = angular.module('chess.navbar', []).
component('navbar', {
  controller: NavbarController,
  templateUrl: 'navbar/navbar.component.html'
});

NavbarController.$inject = []
function NavbarController() {
  var $ctrl = this;

  $ctrl.toggled = false;
  $ctrl.toggle = toggle;

  function toggle() {
    $ctrl.toggled = !$ctrl.toggled;
  }
}
