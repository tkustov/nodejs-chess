var path = require('path');
var pkg = require('./package.json');

var target = path.join(__dirname, 'lib');
var clientTarget = path.join(target, 'client');
var clientAssets = path.join(clientTarget, 'assets');
var serverTarget = path.join(target, 'server');
var commonTarget = path.join(target, 'common');
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

var clientLess = {
  src: path.resolve(__dirname, 'src/client/index.less'),
  dest: prefix + '.css'
};

var clientHtml = {
  src: path.resolve(__dirname, 'src/client/index.html'),
  dest: 'index.html',
  files: [
    clientJs.dest,
    clientPartials.dest,
    clientLess.dest
  ]
};

var client = {
  target: clientTarget,
  assets: clientAssets,
  js: clientJs,
  partials: clientPartials,
  less: clientLess,
  html: clientHtml
};

var server = {
  target: serverTarget,
  src: path.resolve(__dirname, 'src/server')
};

var common = {
  target: commonTarget,
  src: path.resolve(__dirname, 'src/common')
};

exports.target = target;
exports.server = server;
exports.client = client;
exports.common = common;
