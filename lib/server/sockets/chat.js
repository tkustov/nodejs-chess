var socketsManager = require('./sockets-manager');
require('../db');
var mongoose = require("mongoose");
var User = mongoose.model('User');
var Game = mongoose.model('Game');

socketsManager('chat').on('connection', socket => {
  var room;
  socket.on('join', (data)=>{
    room = data;
    socket.join(room);
  });
  
  socket.on('send:message', function (data) {
    Game.findOneAndUpdate(
      {gameRoom: room},
      {$push: {chat : {"nick":data.who, "message":data.message}}},
      {safe: true},
      function(err, game) {
          console.log(err);
      }
    );
    socket.in(room).emit('send:message', {
      nick: data.who,
      message: data.message
    });
    socket.emit('send:message', {
      nick: data.who,
      message: data.message
    });
  });
});
  
