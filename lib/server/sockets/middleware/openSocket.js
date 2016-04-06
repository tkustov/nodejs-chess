var mongoose = require("mongoose");
var User = mongoose.model('User');
var socketsManager = require('../sockets-manager');

module.exports = function(req, res, next) {
  if (req.session.user) {
    console.log("sockets middleware!");
    var namespace;
    User.getNamespaceByUserID(req.session.user, function(data){
      namespace = data;
      console.log('namespace from middleware: ', namespace);
      socketsManager(namespace);

      socketsManager(namespace).on('connection', socket => {
        User.updateStatusStatic(req.session.user, 'online');
        console.log('Set status online', req.session.user);
        socket.on('disconnect', ()=>{
          User.updateStatusStatic(req.session.user, 'offline');
          console.log('Set status OFF', req.session.user);
        });
      });

    });
  }
  next();
};
