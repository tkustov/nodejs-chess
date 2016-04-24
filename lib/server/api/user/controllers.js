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

exports.userInfo =  function(req, res) {
  User.findById({_id:req.session.user}, function(err, user) {res.send(user)})
};

exports.usersOnline =  function(req, res) {
  User.getUsersOnlineExceptCurrent(req.session.user, function(data){
    res.send(data);
  });
};
