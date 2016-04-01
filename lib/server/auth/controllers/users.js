var mongoose = require("mongoose");
var User = mongoose.model('User');

module.exports.isAuthorized = function(req, res) {

  User.isAuthorized(req.body.username, req.body.password, function(err, user) {
    if (err) {
      res.status(401).json({ 'message': err.message });
    } else {
      req.session.user = user._id;
      req.session.username = user.username;
      req.session.status = true;
      req.session.timestamp = Date.now();
      res.status(200).json({ 'message': 'authorized' });
    }
  });

};

module.exports.registerNewUser = function(req, res) {

  var user = new User({
    username: req.body.username
  });

  user.setPassword(req.body.password);
  user.save(function(err) {
    if (err) {
      res.status(400).json({ 'message': 'user with this name already exist' });
    } else {
      req.session.user = user._id;
      req.session.status = true;
      res.status(201).json({ 'message': 'user created' });
    }
  });

};

module.exports.logout = function(req, res){
  // req.session.status = false;
  req.session.destroy();
  res.sendStatus(200).json({'message': 'user deleted'});
};