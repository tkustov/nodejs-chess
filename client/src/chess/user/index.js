module.exports = 'chess.user';

angular.module('chess.user', [])
.factory('user', UserFactory);

UserFactory.$inject = ['$http']
function UserFactory($http) {
  // var factory = {
  //   user: null,
  //   getUserData: getUserData
  // };
  
  // factory.getUserData();
  
  // return factory;


  // function getUserData() {
  //   return $http.get(process.env.API_URL + '/api/user/name', {withCredentials: true})
  //   .then(function(response) {
  //     factory.user = response.data;
  //   });
  // }
  return {
    getUserData: getUserData
  };
  
  function getUserData() {
    return $http.get(process.env.API_URL + '/api/user/name', {withCredentials: true});
  }
}