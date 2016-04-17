module.exports = {
  controller: PlayersRoomController,
  templateUrl: 'playersRoom/playersRoom.component.html'
};

PlayersRoomController.$inject = ['PlayersRoom', 'Socket', '$http', '$location'];
function PlayersRoomController(PlayersRoom, Socket, $http, $location) {
  var $ctrl = this;

  $ctrl.usersOnline = [];
  $ctrl.incommingInvites = [];
  $ctrl.status = "Can't connect to Socket! Server is not running or your internet connection is bad :(";

  $http.get(process.env.API_URL + '/api/user/room/', {withCredentials: true})
  .then(function(response) {
    var userRoom = response.data.userRoom.toString();
    console.log('user room: ', userRoom);
  });
  
};
