var angular = require("angular");

module.exports = 'chess.sprite';
angular.module('chess.sprite', []).
constant('piecesSprite', {
  king: 0,
  queen: 1,
  bishop: 2,
  knight: 3,
  rook: 4,
  pawn: 5
}).
config(SpriteConfig).
provider('sprites',spritesProvider);

spritesProvider.$inject = [];
function spritesProvider() {
  var sprites = {};
  this.add = function (name, url, config) {
    sprites[name] = {
      url: url,
      config: config
    };
  };
  this.$get = spritesFactory;
  
  spritesFactory.$inject = ['$q'];
  function spritesFactory($q) {
    
    function load(url, config){
    return $q(function (resolve, reject) {
    var img = document.createElement('img');
    img.src = url;
    img.addEventListener('load', function () {
      var canvas = document.createElement('canvas');
      var c = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      c.clearRect(0, 0, canvas.width, canvas.height);
      c.drawImage(img, 0, 0);
      resolve(Object.keys(config).reduce(function (sprite, key) {
        var item = config[key];
        var xSprite = item * 62.5; //Left
        sprite[key] = {
          white: imageDataToImage(c.getImageData(xSprite, 0, 62.5, 62.5)), 
          black: imageDataToImage(c.getImageData(xSprite, 62.5, 62.5, 62.5))
        };
        return sprite;
      }, {}));
    });
    img.addEventListener('abort', reject);
    img.addEventListener('error', reject);
  });
  }
  
  function imageDataToImage(imageData) {
    var img = document.createElement('img');
    var cnv = document.createElement('canvas');
    var c = cnv.getContext('2d');
    cnv.width = imageData.width;
    cnv.height = imageData.height;
    c.putImageData(imageData, 0, 0);
    img.src = cnv.toDataURL();
    return img;
  }
    
  return $q(function (resolve, reject) {
    Object.keys(sprites).reduce(function (result, name) {
    var sprite = sprites[name];
    load(sprite.url, sprite.config).then(
      function (res) {result[name] = res; resolve(result);},
      function (rejection) {console.log(rejection.type);});
    }, {});
    });
  }
}

SpriteConfig.$inject = ['spritesProvider', 'piecesSprite'];
function SpriteConfig(spritesProvider, piecesSprite) {
  // name of sprite, image url, sprite config
  spritesProvider.add(
    'pieces',
    'assets/images/pieces.png',
    piecesSprite
  );
}
