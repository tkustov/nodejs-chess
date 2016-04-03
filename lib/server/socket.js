var socket = require('socket.io');
var server = require('./server');

module.exports = socket(server);
