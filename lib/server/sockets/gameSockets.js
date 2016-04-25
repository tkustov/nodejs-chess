var socketsManager = require('./sockets-manager');

require('../models/db');
var mongoose = require("mongoose");
var User = mongoose.model('User');


var gameSockets = socketsManager('game');

gameSockets.on('connection', socket => {
  // for test! should remove:
  // socket.emit('test', 'Hi, someone in GAME ns!');
  // console.log('Client connect to GAME NS');

  var userData;
  // var user; // - for test! should remove

  socket.on('join', (data)=>{
    userData = data;
    socket.join(userData.userRoom);
    User.updateStatus(userData.userId, 'online');

    // for test! should remove:
    // User.getUserByRoom(userRoom, function(data) { 
    //   user = data;
    //   socket.emit('test', 'Hi, ' + user.username + ' in GAME ns!');
    //   console.log(user.username, 'has joined to his own room.');
    //  });
  });

  socket.on('disconnect', function() {
    if(socketsManager('game').adapter.rooms[userData.userRoom] == undefined){
      User.updateStatus(userData.userId, 'offline');
      // for test! should remove:
      // console.log(user.username, 'disconnected from GAME NS and own room.');
    };
  });
});
