var mongoose = require("mongoose");
var User = mongoose.model('User');

exports.authorization = function(req, res) {
  
  if (!(req.body.username && req.body.password)) {
    res.status(400).json({ 'message': 'all fields required' });
    return false;
    }
    
  User.authorization(req.body.username, req.body.password, function(err, user) {
    
    if (err) {
      res.status(401).json({ 'message': err.message });
    } else {
      req.session.user = user._id;
      req.session.username = user.username;
      res.status(200).json({ 'message': 'authorized' });
    }
    
  });

};

exports.registration = function(req, res) {
  
  if (!(req.body.username && req.body.email && req.body.password)) {
    res.status(400).json({ 'message': 'all fields required' });
    return false;
    }
  
  var user = new User({
    username: req.body.username,
    email: req.body.email
  });

  user.setPassword(req.body.password);
  user.save(function(err) {
    if (err) {
      res.status(400).json({ 'message': 'user with this name already exist' });
    } else {
      req.session.user = user._id;
      req.session.username = user.username;
      res.status(201).json({ 'message': 'user created' });
    }
  });

};

exports.logout = function(req, res) {
  req.session.destroy();
  res.sendStatus(200);
};
