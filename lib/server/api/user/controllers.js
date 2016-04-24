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
};

exports.deleteUserAccount = function(req, res) {
  res.sendStatus(200);
};

exports.userInfo =  function(req, res) {
<<<<<<< f779e6e4d50d237ee66ba8fb62430d730468e402
<<<<<<< 9e1f189da32ab97c703d8e6effa5897b88c24f3e
  User.findById({_id:req.session.user}, function(err, user) {res.send(user)})
=======
  res.send({
    name: req.session.username,
    score: 2506,
    email: 'test@test.com',
    room: 'djsghjdsfgjds&re9r'
  });
>>>>>>> Fixing auth styles for good displaying in mozilla
=======
  User.findById({_id:req.session.user}, function(err, user) {res.send(user)})
>>>>>>> create method findUserInfo in user controller
};

exports.usersOnline =  function(req, res) {
  User.getUsersOnlineExceptCurrent(req.session.user, function(data){
    res.send(data);
  });
};
