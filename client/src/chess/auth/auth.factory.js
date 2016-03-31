module.exports = AuthFactory;

AuthFactory.$inject = ['$http'];
function AuthFactory($http) {
	return {
    login: login,
    register: register
	};

  function login(data) {
    return $http.post(process.env.API_URL + '/login', data, {withCredentials: true}).
    then(function (response) {
      return response.status + ' ' + response.statusText;
    });
  }
  function register(data) {
  	return $http.post(process.env.API_URL + '/register', data, {withCredentials: true}).
  	then(function (response) {
  		return response.status + ' ' + response.statusText;
  	});
  }
};