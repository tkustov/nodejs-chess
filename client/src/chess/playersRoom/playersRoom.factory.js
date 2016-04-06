module.exports = PlayersRoomFactory;

PlayersRoomFactory.$inject = ['$http'];
function PlayersRoomFactory($http) {
  return {
    getNamespace: getNamespace,
    // post: post,
    // setCookie: setCookie
  };

  function getNamespace() {
    return $http.get(process.env.API_URL + '/api/namespace', { withCredentials: true }).
      then(function (response) {
        return response.data;
      });
  }

  // function post() {
  //   return $http.post(process.env.API_URL + '/ping').
  //     then(function (response) {
  //       return response.data;
  //     });
  // }
  //
  // function setCookie(name, value) {
  //   return $http.post(process.env.API_URL + '/ping/cookie', { name: name, value: value }, { withCredentials: true }).
  //     then(function (response) {
  //       return response.data;
  //     });
  // }
}
