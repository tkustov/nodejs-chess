var socketsManager = require('./sockets-manager');
require('../models/db');
var mongoose = require("mongoose");
var User = mongoose.model('User');
var Game = mongoose.model('Game');

socketsManager('chat').on('connection', socket => {
  var userRoom;
  socket.on('join', (data)=>{
    userRoom = data;
    socket.join(userRoom);
    console.log('user joined to', userRoom);
  });
  var name = 'lisa';
  var uses = ['bar', 'foo'];
  // send the new user their name and a list of users
  socket.emit('init', {
    name: name,
    users: uses
  });

  // notify other clients that a new user has joined
  /*socket.broadcast.emit('user:join', {
    name: name
  });*/

  // broadcast a user's message to other users
  socket.on('send:message', function (data) {
  	console.log(data.message);

    socket.broadcast.emit('send:message', {
      user: name,
      text: data.message
    });
    socket.emit('send:message', {
      user: name,
      text: data.message
    });
  });
});
  
