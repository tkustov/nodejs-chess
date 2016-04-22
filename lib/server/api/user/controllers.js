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
  res.send({
    name: req.session.username,
    score: 2506,
    email: 'test@test.com',
    room: 'djsghjdsfgjds&re9r'
  });
};
