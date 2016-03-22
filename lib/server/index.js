var path = require('path');
var express = require('express');
var Server = require('http').Server;
var socket = require('socket.io');

var app = express();
var server = Server(app);
var io = socket(server);

server.listen(8081);

app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': req.get('Origin'),
    'Access-Control-Allow-Methods': ['GET', 'POST', 'OPTIONS', 'PUT'].join(', '),
    'Access-Control-Allow-Headers': ['Accept', 'Content-Type'].join(', '),
    'Access-Control-Allow-Credentials': 'true'
  });
  next();
});

app.get('/ping', (req, res) => {
  res.json({ pong: true });
});

app.post('/ping', (req, res) => {
  res.json({ pong: true });
});

io.on('connection', socket => {
  socket.emit('msg', 'hello world!');
});
