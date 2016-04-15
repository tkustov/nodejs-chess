module.exports = 'chess.user';

angular.module('chess.user', [])
.factory('user', UserFactory);

UserFactory.$inject = ['$http']
function UserFactory($http) {
  var factory = {
    username: 'name',
    userId: 'userID',
    getUserStatus: getUserStatus
  };
  return factory;

  function getUserStatus() {
    $http.get(process.env.API_URL + '/api/chess', {withCredentials: true})
    // handle success
    .then(function(response) {
      console.log(factory);
      console.log(factory.username);
      console.log('factory');
      factory.username = response.data.username;
      console.log(factory.username);
          }, error)
  };

  function error(response) {
    console.log(response.status + ' ' + response.statusText);
  };
}
