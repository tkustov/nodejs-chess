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
  var user;

  socket.on('join', (data)=>{
    userData = data;
    socket.join(userData.userRoom);
    User.updateStatus(userData.userId, 'online');

    //використати тут метод Вови, щоб дістати тільки безпечну інфу.
    User.findById({_id:userData.userId}, function(err, data) {
      user = data;
      socket.broadcast.emit('userJoined', {id: user._id, name: user.username});
    });

  });

  socket.on('disconnect', function() {
    if(socketsManager('game').adapter.rooms[userData.userRoom] == undefined){
      User.updateStatus(userData.userId, 'offline');
      gameSockets.emit('userLeft', {id: user._id});
      // for test! should remove:
      // console.log(user.username, 'disconnected from GAME NS and own room.');
    };
  });
});
