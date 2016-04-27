var socketsManager = require('./sockets-manager');

require('../models/db');
var mongoose = require("mongoose");
var User = mongoose.model('User');


var gameSockets = socketsManager('game');

gameSockets.on('connection', socket => {
  //console.log('Someone connected to GAME Namespace');
  var userId;
  var user;

  socket.on('identification', (data)=>{
    userId = data.userId;

    User.updateStatus(userId, 'online');
    User.setSocketId(userId, socket.id);

    User.findById({_id:userId}, function(err, data) {
      user = data;
      socket.join('playersRoom');
      socket.broadcast.emit('userJoined', {id: user._id, name: user.username});
      console.log(user.username,' - joined to playersRoom');
    });

    socket.on('disconnect', function() {
        User.setSocketId(userId, '');
        User.updateStatus(userId, 'offline');
        gameSockets.emit('userLeft', {userId: userId});
        console.log(user.username, '- disconnected from GAME NS and playersRoom.');
    });
    
  });

});
