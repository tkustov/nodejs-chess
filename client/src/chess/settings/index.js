var angular = require('angular');
var ngRoute = require('angular-route');

module.exports = angular.module('chess.settings', [
  ngRoute
]).
config(RouteConfig);

RouteConfig.$inject = ['$routeProvider'];
function RouteConfig($routeProvider) {
  $routeProvider.when('/settings', {
    controller: SettingsController,
    templateUrl: 'settings/settings.component.html'
  });
}
function SettingsController(){
  var ctrl = this;
  ctrl.photobutton = document.getElementById("photobutton");
  ctrl.photobutton.addEventListener("click", photoShow);
  function photoShow(){
    ctrl.photodiv = document.getElementById("photo");
    if(ctrl.photodiv.style.display === "none"){
      ctrl.photodiv.style.display = "block";
    }else{
      ctrl.photodiv.style.display = "none";
    }
}
ctrl.passbutton = document.getElementById("passbutton");
  ctrl.passbutton.addEventListener("click", passShow);
  function passShow(){
    ctrl.passdiv = document.getElementById("password_modal");
    if(ctrl.passdiv.style.display === "none"){
      ctrl.passdiv.style.display = "block";
    }else{
      ctrl.passdiv.style.display = "none";
    }
  }
}