module.exports = {
  controller: PlayersRoomController,
  templateUrl: 'playersRoom/playersRoom.component.html'
};

PlayersRoomController.$inject = ['PlayersRoom', 'Socket', '$http', '$location', '$scope', 'user'];
function PlayersRoomController(PlayersRoom, Socket, $http, $location, $scope, user) {
  var $ctrl = this;

  $ctrl.usersOnline = [];
  $ctrl.incommingInvites = [];
  $ctrl.isOnline = user.isOnline;

  // $ctrl.getUsersOnline = function(){
  //   console.log('getUsersOnline');
  //   $http.get(process.env.API_URL + '/api/user/users-online/', {withCredentials: true})
  //   .then(function(response) {
  //     $ctrl.usersOnline = response.data;
  //     console.log($ctrl.usersOnline);
  //   });
  // };
  // $ctrl.getUsersOnline();
}
