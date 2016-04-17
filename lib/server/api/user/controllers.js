var mongoose = require("mongoose");
var User = mongoose.model('User');

exports.userName =  function(req, res) {
  res.send({username: req.session.username});
};

exports.userRoom =  function(req, res) {
  User.getUserRoom(req.session.user, function(data){
    res.send({userRoom: data});
  })
};
