module.exports = FindUser;

FindUser.$inject = ['$http']
function FindUser($http) {
  var $ctrl = this;

  $ctrl.username = null;

  function showError(response) {
    alert('You must login');
  }

  $http.get(process.env.API_URL + '/api/chess', {withCredentials: true}).
  then(function(response) {
    $ctrl.username = response.data.username;
  }, showError)
}
