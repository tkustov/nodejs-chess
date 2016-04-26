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

  $ctrl.getUsersOnline = function(){
    $http.get(process.env.API_URL + '/api/user/users-online/', {withCredentials: true})
    .then(function(response) {
      $ctrl.usersOnline = response.data;
      console.log( $ctrl.usersOnline);
    });
  };
  $ctrl.getUsersOnline();

  var gameSocket = Socket('game');

  gameSocket.on('userJoined', function(data){
    if (user.userInfo._id != data.id) {$ctrl.usersOnline.push(data)};
  });

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

  gameSocket.on('startGame', function(data){
    //set game id
    //redirect to game path
  });


}
