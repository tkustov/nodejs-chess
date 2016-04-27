module.exports = {
  controller: PlayersRoomController,
  templateUrl: 'playersRoom/playersRoom.component.html'
};

PlayersRoomController.$inject = ['$http', 'PlayersRoom', 'user'];
function PlayersRoomController($http, PlayersRoom, user) {
  var $ctrl = this;

  $ctrl.usersOnline = PlayersRoom.getUsersOnline;
  $ctrl.incommingInvitations = PlayersRoom.getInvitations;
  $ctrl.isOnline = user.isOnline;
  
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

}
