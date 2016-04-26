var mongoose = require("mongoose");
var User = mongoose.model('User');

// exports.userName =  function(req, res) {
//   res.send({username: req.session.username});
// };

// exports.userRoom =  function(req, res) {
//   User.getUserRoom(req.session.user, function(data){
//     res.send({userRoom: data});
//   })
// };

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
<<<<<<< HEAD
=======
};

exports.deleteUserAccount = function(req, res) {
  res.sendStatus(200);
>>>>>>> 87c043acc7ba0af251e13d404b42468a60b63c84
};

exports.deleteUserAccount = function(req, res) {
  res.sendStatus(200);
};
