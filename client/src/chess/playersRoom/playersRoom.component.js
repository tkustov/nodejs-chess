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


  var gameSocket;

  $http.get(process.env.API_URL + '/api/user/room/', {withCredentials: true})
  .then(function(response) {
    var userRoom = response.data.userRoom.toString();
    
    gameSocket = Socket('game');
    gameSocket.on('connect', function(data) {
      gameSocket.emit('join', userRoom);
      console.log('connected to /game and userRoom');
      $ctrl.status = 'Connected :)'
    });

    gameSocket.on('disconnect', function(data) {
     console.log('disconnect from /game and userRoom');
     $ctrl.status = 'Disconnected :('
   });
  });
}
