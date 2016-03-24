var path = require('path');
var pkg = require('./package.json');

var target = path.join(__dirname, 'lib/client');
var assets = path.join(target, 'assets');
var prefix = pkg.name + '-' + pkg.version;

var js = {
  src: [path.resolve(__dirname, 'client/src/index.js')],
  dest: prefix + '.js'
};

var less = {
  src: path.resolve(__dirname, 'client/src/index.less'),
  dest: prefix + '.css'
};

var html = {
  src: path.resolve(__dirname, 'client/src/index.html'),
  dest: 'index.html'
};

var env = Object.assign({
  NODE_ENV: 'development',
  API_URL: '//localhost:8081'
}, process.env);

module.exports = {
  target,
  assets,
  env,
  js,
  less,
  html
};
