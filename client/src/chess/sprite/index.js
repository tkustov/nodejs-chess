var angular = require("angular");

module.exports = 'chess.sprite';
angular.module('chess.sprite', []).
constant('piecesSprite', {
  wKing: {
    top: 0,
    left: 0,
    width: 62,
    height: 62
  },
  bKing: {
    top: 62,
    left: 0,
    width: 62,
    height: 62
  },
  wQueen: {
    top: 0,
    left: 62,
    width: 62,
    height: 62
  },
  bQueen: {
    top: 62,
    left: 62,
    width: 62,
    height: 62
  },
  wBishop: {
    top: 0,
    left: 124,
    width: 62,
    height: 62
  },
  bBishop: {
    top: 62,
    left: 124,
    width: 62,
    height: 62
  },
  wKnight: {
    top: 0,
    left: 186,
    width: 62,
    height: 62
  },
  bKnight: {
    top: 62,
    left: 186,
    width: 62,
    height: 62
  },
  wRook: {
    top: 0,
    left: 248,
    width: 62,
    height: 62
  },
  bRook: {
    top: 62,
    left: 248,
    width: 62,
    height: 62
  },
  wPawn: {
    top: 0,
    left: 310,
    width: 62,
    height: 62
  },
  bPawn: {
    top: 62,
    left: 310,
    width: 62,
    height: 62
  }
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
          c.drawImage(img, 0, 0);
          resolve(Object.keys(config).reduce(function (sprite, key) {
            var item = config[key];
            sprite[key] = imageDataToImage(c.getImageData(item.left, item.top, item.width, item.height));
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
    
    return Object.keys(sprites).reduce(function (result, name) {
      var sprite = sprites[name];
      result[name] = load(sprite.url, sprite.config);
      return result;
    }, {});
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
