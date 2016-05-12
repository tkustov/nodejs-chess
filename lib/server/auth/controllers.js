
var sendJSONResponce = function(res, status, message) {
  res.status(status);
  res.json({message: message});
};

module.exports = function(db) {
  
  var authorization = function(req, res) {
    if (!(req.body.username && req.body.password)) {
      sendJSONResponce(res, 400, 'all fields required');
      return;
    }
    db.user.authorization(req.body.username, req.body.password, function(err, user) {
      if (err) {
        sendJSONResponce(res, 401, err.message);
      } else {
        req.session.user = user._id;
        req.session.username = user.username;
        sendJSONResponce(res, 200, 'authorized');
      }
    });
  };

  var registration = function(req, res) {
    if (!(req.body.username && req.body.email && req.body.password)) {
      sendJSONResponce(res, 400, 'all fields required');
      return;
      }
    db.user.register(req.body.username, req.body.email, req.body.password, function(err, user) {
      if (err) {
        sendJSONResponce(res, 400, 'User with this credentials already exists');
      } else {
        req.session.user = user._id;
        req.session.username = user.username;
        sendJSONResponce(res, 201, 'User registred');
      }
    });
  };
  
  var logout = function(req, res) {
    req.session.destroy();
    res.sendStatus(200);
  };

  return {
    authorization: authorization,
    registration: registration,
    logout: logout
  };
};
