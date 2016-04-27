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

exports.deleteUserAccount = function(req, res) {
  User.findById({_id:req.session.user})
    .remove({}, function() { console.log('user deleted') });
  req.session.destroy();
  res.sendStatus(200);
};

exports.changeUserPassword =  function(req, res) {
  User.findById({_id:req.session.user})
    .exec(function(err, user) {
      if (user.checkPassword(req.body.currentPassword)) {
        user.setPassword(req.body.newPassword)
        user.save(function(err) {
          if (err) {
            res.status(400).json({ 'message': 'server error' });
          } else {
            res.status(200).json({ 'message': 'password changed' });
          }
        });
      } else {
        res.status(400).json({ 'message': 'Incorrect password.' });
      }

    })

};
