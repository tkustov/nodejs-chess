var socketsManager = require('./sockets-manager');

require('../models/db');
var mongoose = require("mongoose");
var User = mongoose.model('User');


socketsManager('game').on('connection', socket => {
  var userRoom;
  socket.on('join', (data)=>{
    userRoom = data;
    socket.join(userRoom);
    //console.log('user joined to', userRoom);
    updateStatus(userRoom, 'online');
  });
  socket.on('leave', (data)=>{
    userRoom = data;
    socket.leave(userRoom);
    //console.log('user left', userRoom);
    updateStatus(userRoom, 'offline');
  });
  socket.on('disconnect', function() {
    if(socketsManager('game').adapter.rooms[userRoom] == undefined){
      //console.log('user offline!');
      //make user offline!
      updateStatus(userRoom, 'offline');
    };
  });
});

function updateStatus(userRoom, status){
 User.getUserIdByRoom(userRoom, function(userId) {
    User.updateStatus(userId, status)
  });
};