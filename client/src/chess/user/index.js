module.exports = 'chess.user';

angular.module('chess.user', [])
.factory('user', UserFactory);

UserFactory.$inject = ['$http','$rootScope']
function UserFactory($http, $rootScope) {

  var factory = {
    userInfo: null,
    getUserInfo: getUserInfo,
    isLoggedIn: isLoggedIn
  };

  return factory;

  function getUserInfo() {
    return $http.get(process.env.API_URL + '/api/user/info', {withCredentials: true}).
      then(function(response) {
        factory.userInfo = response.data;
        $rootScope.$broadcast('Authorized');
      });
  }

  function isLoggedIn() {
    return Boolean(factory.userInfo);
  }
}
