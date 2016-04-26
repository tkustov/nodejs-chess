var mongoose = require("mongoose");
var User = mongoose.model('User');


exports.userInfo =  function(req, res) {
  User.findById({_id:req.session.user})
    .select('-salt -hash -status -__v')
    .exec(function(err, user) {res.send(user)})
};

exports.usersOnline =  function(req, res) {
  User.getUsersOnlineExceptCurrent(req.session.user, function(data){
    res.send(data);
  });
};

exports.changeUserEmail =  function(req, res) {
  res.sendStatus(200);
};

exports.deleteUserAccount = function(req, res) {
  res.sendStatus(200);
};

exports.changeUserPassword =  function(req, res) {
  res.sendStatus(200);

};

exports.usersOnline =  function(req, res) {
  User.getUsersOnlineExceptCurrent(req.session.user, function(data){
    res.send(data);
  });
};
