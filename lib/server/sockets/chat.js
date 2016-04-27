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
  });

  // broadcast a user's message to other users and himself
  socket.on('send:message', function (data) {
    socket.broadcast.in(userRoom).emit('send:message', {
      user: data.who,
      text: data.message
    });
    socket.emit('send:message', {
      user: data.who,
      text: data.message
    });
  });
});
  
