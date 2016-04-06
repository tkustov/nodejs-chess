module.exports = {
  controller: PlayersRoomController,
  templateUrl: 'playersRoom/playersRoom.component.html'
};

PlayersRoomController.$inject = ['PlayersRoom', 'Socket', '$http'];
function PlayersRoomController(PlayersRoom, Socket, $http) {
  var $ctrl = this;

  $ctrl.usersOnline = [];

  $ctrl.usersOnlineRefresh = function(){
    console.log('usersOnlineRefresh');
    $http.get(process.env.API_URL + '/api/usersonline/', {withCredentials: true})
    .then(function(response) {
      $ctrl.usersOnline = response.data;
    });
  };

  $ctrl.sendInvite = function(opponentID){
    $http.get(process.env.API_URL + '/api/user/invite/send/'+ opponentID, {withCredentials: true})
    .then(function(response) {
      if (response.status == 200) { console.log('Invite sent...');}
    });
  };

  var userSocket;

  $http.get(process.env.API_URL + '/api/user/namespace/', {withCredentials: true})
  .then(function(response) {
    var ns = response.data.namespace.toString();
    console.log('user namespace: ', ns);
    userSocket = Socket(ns);
  })
  .then(function(){
    userSocket.on('connect', function () {
      console.log('connected to user namespace!');
    });

    userSocket.on('msg', function (data) {
      console.log('data from user namespace: ', data);
      userSocket.emit('some', 'HI!!!')
    });

    userSocket.on('incommingInvite', function (data) {
      console.log('incommingInvite: ', data);
    });

  })
}
