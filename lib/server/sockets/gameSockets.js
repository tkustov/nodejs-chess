var socketsManager = require('./sockets-manager');

require('../db');
var mongoose = require("mongoose");
var User = mongoose.model('User');


var gameSockets = socketsManager('game');

gameSockets.on('connection', socket => {
  var userId;
  var user;

  socket.on('identification', (data)=>{
    if (!data) {return};
    userId = data.userId;

    User.findById({_id:userId}, function(err, data) {
      if (!err && data) { 
        user = data;
        user.updateStatusMethod('online');
        user.setSocketIdMethod(socket.id);
        socket.join('playersRoom');
        socket.broadcast.emit('userJoined', {id: user._id, name: user.username});
      }
    });

    socket.on('disconnect', function() {
        if (!user) {return}
        user.setSocketIdMethod(userId, null);
        user.updateStatusMethod('offline');
        gameSockets.emit('userLeft', {userId: userId});
    });
    
  });

});
