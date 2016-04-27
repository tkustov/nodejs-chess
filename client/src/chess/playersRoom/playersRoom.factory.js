module.exports = PlayersRoomFactory;

PlayersRoomFactory.$inject = ['$http'];
function PlayersRoomFactory($http) {
  var usersOnline = [];

  function getUsersOnline() {
    return usersOnline;
  }

  function newUser(user){
    
    var isUserExist = usersOnline.some(function(u){
      return u.id === user.id;
    });

    if (!isUserExist) {
      usersOnline.push(user);
    }
  }

  function removeUser(userId){
    usersOnline = usersOnline.filter(function(u){
      return u.id !== userId;
    });

  }

  function fetchUsersOnline () {
    $http.get(process.env.API_URL + '/api/user/users-online/', {withCredentials: true})
    .then(function(response) {
      usersOnline = response.data;
    });
  }

  var factory = {
    getUsersOnline: getUsersOnline,
    fetchUsersOnline: fetchUsersOnline,
    newUser: newUser,
    removeUser: removeUser,
  };

  return factory;

}
