module.exports = PlayersRoomFactory;

PlayersRoomFactory.$inject = ['$http'];
function PlayersRoomFactory($http) {
  var usersOnline = [];
  var incommingInvitations = [];

  function fetchUsersOnline () {
    return $http.get(process.env.API_URL + '/api/user/users-online/', {withCredentials: true})
    .then(function(response) {
      response.data.forEach(function(user){
        factory.newUser(user);
      })
    });
  }

  function getUsersOnline() {
    return usersOnline;
  }

  function newUser(user){    
    var isUserExist = usersOnline.some(function(u){
      return u.id === user.id;
    });

    if (!isUserExist) {
      user.status = 'free';
      usersOnline.push(user);
    }
  }

  function removeUser(userId){
    usersOnline = usersOnline.filter(function(u){
      return u.id !== userId;
    });
  }

  function changeUserStatus (userId, status) {
    usersOnline = usersOnline.map(function(u){
      if (u.id == userId) {u.status = status}
      return u;
    });
  }

  function clearUsersOnline() {
    usersOnline = [];
  }

  function getInvitations() {
    return incommingInvitations;
  }

  function putInvitation(invitation) {
    incommingInvitations.push(invitation);
  }

  function removeInvitationFromUser(userId) {
    incommingInvitations = incommingInvitations.filter(function(u){
      return u.userId !== userId;
    });
  }

  function clearInvitations() {
    incommingInvitations = [];
  }

  function sendInvitation(userId) {
    return $http.get(process.env.API_URL + '/api/game/invitation/send/'+userId, {withCredentials: true})
    .then(function(response) {
      factory.changeUserStatus(userId, 'pending');
    });
  };

  function cancelInvitation(userId) {
    return $http.get(process.env.API_URL + '/api/game/invitation/cancel/'+userId, {withCredentials: true})
    .then(function(response) {
      factory.changeUserStatus(userId, 'free');
    });
  };

  function acceptInvitation(userId) {
    return $http.get(process.env.API_URL + '/api/game/invitation/accept/'+userId, {withCredentials: true})
    .then(function(response) {
      factory.removeInvitationFromUser(userId);
    });
  };

  function refuseInvitation(userId) {
    return $http.get(process.env.API_URL + '/api/game/invitation/refuse/'+userId, {withCredentials: true})
    .then(function(response) {
      factory.removeInvitationFromUser(userId);
    });
  };
  
  var factory = {
    fetchUsersOnline: fetchUsersOnline,
    getUsersOnline: getUsersOnline,
    newUser: newUser,
    removeUser: removeUser,
    changeUserStatus: changeUserStatus,
    clearUsersOnline: clearUsersOnline,
    getInvitations: getInvitations,
    putInvitation: putInvitation,
    removeInvitationFromUser: removeInvitationFromUser,
    clearInvitations: clearInvitations,
    sendInvitation: sendInvitation,
    cancelInvitation: cancelInvitation,
    acceptInvitation: acceptInvitation,
    refuseInvitation: refuseInvitation
  };

  return factory;
}
