module.exports = {
  controller: PlayersRoomController,
  templateUrl: 'playersRoom/playersRoom.component.html'
};

PlayersRoomController.$inject = ['PlayersRoom', 'Socket', '$http', '$location'];
function PlayersRoomController(PlayersRoom, Socket, $http, $location) {
  var $ctrl = this;

  $ctrl.usersOnline = [];
  $ctrl.incommingInvites = [];
  $ctrl.status = "Can not connect ot Socket! Server is not running or your internet connection is bad :(";

  $ctrl.getUsersOnline = function(){
    console.log('getUsersOnline');
    $http.get(process.env.API_URL + '/api/usersonline/', {withCredentials: true})
    .then(function(response) {
      $ctrl.usersOnline = response.data;
    });
  };
  $ctrl.getUsersOnline();

  $ctrl.sendInvite = function(opponentID){
    $http.get(process.env.API_URL + '/api/user/invite/send/'+ opponentID, {withCredentials: true})
    .then(function(response) {
      if (response.status == 200) { console.log('Invite sent...');}
    });
  };

  $ctrl.accept = function (opponentID) {
    $http.get(process.env.API_URL + '/api/user/invite/accept/'+ opponentID, {withCredentials: true})
    .then(function(response) {
      if (response.status == 200) { console.log('Invite accept');}
    });
  }

  // var userSocket;
  // var generalBUS = Socket();

  // generalBUS.on('updateUsersList', function (data) {
  //   $ctrl.getUsersOnline();
  // });

  $http.get(process.env.API_URL + '/api/user/namespace/', {withCredentials: true})
  .then(function(response) {
    var ns = response.data.namespace.toString();
    console.log('user namespace: ', ns);
    // userSocket = Socket(ns);
  })
  .then(function(){
    // userSocket.on('connect', function () {
    //   console.log('connected to user namespace!');
    //   $ctrl.status = "Connected"
    // });

    // userSocket.on('msg', function (data) {
    //   console.log('data from user namespace: ', data);
    //   userSocket.emit('some', 'HI!!!')
    // });

    // userSocket.on('updateUsersList', function (data) {
    //   $ctrl.usersOnline = data;
    // });

    // userSocket.on('incommingInvite', function (data) {
    //   $ctrl.incommingInvites.push(data);
    //   console.log('incommingInvite: ', data);
    // });

    // userSocket.on('startGame', function (data) {
    //   // save data.gameID to Game Service
    //   console.log('incommingInvite: ', data);
    //   $location.path('/board')
    // });

    // userSocket.on('disconnect', function (data) {
    //   // add force socket disconnest
    //   $ctrl.status = "Disconnected. Please, refrash page or check your internet connection."
    // });

  })
}
