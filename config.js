var path = require('path');
var pkg = require('./package.json');

var target = path.join(__dirname, 'lib');
var clientTarget = path.join(target, 'client');
var clientAssets = path.join(clientTarget, 'assets');
var serverTarget = path.join(target, 'server');
var prefix = pkg.name + '-' + pkg.version;

var clientJs = {
  src: path.resolve(__dirname, 'src/client/index.js'),
  dest: prefix + '.js'
};

var clientPartials = {
  module: 'chess',
  src: path.resolve(__dirname, 'src/client/chess'),
  dest: prefix + '-partials.js'
};

var clientHtml = {
  src: path.resolve(__dirname, 'src/client/index.html'),
  dest: 'index.html',
  files: [
    clientJs.dest,
    clientPartials.dest
  ]
};

var client = {
  target: clientTarget,
  assets: clientAssets,
  js: clientJs,
  partials: clientPartials,
  html: clientHtml
};

var server = {
  target: serverTarget,
  src: path.resolve(__dirname, 'src/server')
};

exports.target = target;
exports.server = server;
exports.client = client;
