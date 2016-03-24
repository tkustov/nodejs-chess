var path = require('path');
var express = require('express');
var Server = require('http').Server;
var socket = require('socket.io');
var ping = require('./ping');

var app = express();
var server = Server(app);
var io = socket(server);

server.listen(8081);

app.use('/ping', ping);

io.on('connection', socket => {
  socket.emit('msg', 'hello world!');
});
