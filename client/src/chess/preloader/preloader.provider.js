var canvas = document.getElementById('cnv');
var c = canvas.getContext('2d');

var imgUri = 'pieces.png';

function LoadSprite(url, config) {
  return new Promise(function (resolve, reject) {
    var img = document.createElement('img');
    img.addEventListener('load', function () {
      var canvas = document.createElement('canvas');
      var c = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      c.drawImage(img, 0, 0);
      resolve(Object.keys(config).reduce(function (sprite, key) {
        var item = config[key];
        sprite[key] = c.getImageData(item.left, item.top, item.width, item.height);
        return sprite;
      }, {}));
    });
    img.addEventListener('abort', reject);
    img.addEventListener('error', reject);
    img.src = url;
  });
}

LoadSprite(imgUri, {
  bigRed1: {
    top: 13,
    left: 10,
    width: 100,
    height: 100
  },
  long1: {
    top: 25,
    left: 215,
    width: 100,
    height: 65
  }
}).
then(function (sprite) {
  c.putImageData(sprite.bigRed1, 0, 0);
  c.putImageData(sprite.long1, 0, 100);
}, function (rejection) {
  console.log(rejection.type);
});

/*function someProvider() {
    this.$get = function() {
        return 42
    }
}

myModule.provide("TheAnswer", someProvider)*/