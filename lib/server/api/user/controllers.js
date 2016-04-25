var mongoose = require("mongoose");
var User = mongoose.model('User');

exports.userInfo =  function(req, res) {
  User.findById({_id:req.session.user})
    .select('-salt -hash -status -__v')
    .exec(function(err, user) {res.send(user)})
};

exports.changeUserPassword =  function(req, res) {
  res.sendStatus(200);
};


exports.changeUserEmail =  function(req, res) {
  res.sendStatus(200);
};

exports.deleteUserAccount = function(req, res) {
  res.sendStatus(200);
};
