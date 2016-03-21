var path = require('path');
var express = require('express');
var Server = require('http').Server;
var socket = require('socket.io');

var app = express();
var server = Server(app);
var io = socket(server);

server.listen(8080);

io.on('connection', socket => {
  socket.emit('msg', 'hello world!');
});
