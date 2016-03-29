var express = require('express');
var api = express();

api.get('/chess', function(req, res) {
  res.send({username: req.session.username});
});

module.exports = api;