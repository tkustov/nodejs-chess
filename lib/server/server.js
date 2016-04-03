var Server = require('http').Server;
var app = require('./app');

module.exports = Server(app);
