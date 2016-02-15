var path = require('path');
var pkg = require('./package.json');

var target = path.join(__dirname, 'lib/client');
var assets = path.join(target, 'assets');
var prefix = pkg.name + '-' + pkg.version;

var js = {
  src: [path.resolve(__dirname, 'client/src/index.js')],
  dest: prefix + '.js'
};

var partials = {
  module: 'chess',
  src: path.resolve(__dirname, 'client/src/chess'),
  dest: prefix + '-partials.js'
};

var less = {
  src: path.resolve(__dirname, 'client/src/index.less'),
  dest: prefix + '.css'
};

var html = {
  src: path.resolve(__dirname, 'client/src/index.html'),
  dest: 'index.html',
  files: [
    js.dest,
    partials.dest,
    less.dest
  ]
};

module.exports = {
  target: target,
  assets: assets,
  js: js,
  partials: partials,
  less: less,
  html: html
};
