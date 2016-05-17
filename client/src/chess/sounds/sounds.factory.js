module.exports = SoundsFactory;

SoundsFactory.$inject = ['$http'];
function SoundsFactory($http) {
  console.log('SoundsFactory init');

  function play(name){
    console.log('playing...', name);
  };

  var factory = {
    play: play
  };
  return factory
};
