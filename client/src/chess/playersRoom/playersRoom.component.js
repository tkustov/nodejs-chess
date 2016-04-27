module.exports = {
  controller: PlayersRoomController,
  templateUrl: 'playersRoom/playersRoom.component.html'
};

PlayersRoomController.$inject = ['PlayersRoom', 'Socket', '$http', '$location', '$scope', 'user', 'Game'];
function PlayersRoomController(PlayersRoom, Socket, $http, $location, $scope, user, Game) {
  var $ctrl = this;

  $ctrl.usersOnline = PlayersRoom.getUsersOnline;
  $ctrl.incommingInvites = [];
  $ctrl.isOnline = user.isOnline;

  console.log(PlayersRoom.getUsersOnline());
  // $ctrl.getUsersOnline = function(){
  //   $http.get(process.env.API_URL + '/api/user/users-online/', {withCredentials: true})
  //   .then(function(response) {
  //     $ctrl.usersOnline = response.data;
  //   });
  // };
  
  $ctrl.sendInvitation = function(userId){
    $http.get(process.env.API_URL + '/api/game/invitation/send/'+userId, {withCredentials: true})
    .then(function(response) {
      console.log('send invitation');
    });
  };

  $ctrl.acceptInvitation = function (userId) {
    $http.get(process.env.API_URL + '/api/game/invitation/accept/'+userId, {withCredentials: true})
    .then(function(response) {
      console.log('accept invitation');
    });
  };

  // $ctrl.getUsersOnline();
  
  // $scope.$on('SocketConnected', function(){
  //   $ctrl.getUsersOnline();
  // });

  $scope.$on('SocketInitEnd', function(){
    
    var gameSocket = Socket('game');

    // gameSocket.on('userJoined', function(data){
    //   if (user.userInfo._id != data.id) {$ctrl.usersOnline.push(data)};
    //   // console.log('userJoined', data);
    // });

    gameSocket.on('userLeft', function(data){
      // console.log('userLeft', data);
    });

    gameSocket.on('incomingInv', function(data){
      $ctrl.incommingInvites.push(data);
    });

    gameSocket.on('startGame', function(data){
      Game.setGameId(data.gameId);
      $location.path('/game')
    });
  });


}
