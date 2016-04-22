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
};
