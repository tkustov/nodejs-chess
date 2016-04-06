var mongoose = require("mongoose");
var User = mongoose.model('User');
var socketsManager = require('../sockets-manager');

module.exports = function(req, res, next) {
  if (req.session.user) {
    var namespace;
    User.getNamespaceByUserID(req.session.user, function(data){
      namespace = data;
      socketsManager(namespace).on('connection', socket => {
        User.updateStatusStatic(req.session.user, 'online');
        socketsManager('/').emit('updateUsersList');
        console.log('Set status ONline', req.session.user, '\n');
        socket.on('disconnect', ()=>{
          User.updateStatusStatic(req.session.user, 'offline');
          console.log('Set status OFFline', req.session.user, '\n');
          socketsManager('/').emit('updateUsersList');
        });
      });

    });
  }
  next();
};
