var express = require('express');
var api = express();

var mongoose = require("mongoose");
var User = mongoose.model('User');

api.get('/chess', function(req, res) {
  res.send({username: req.session.username});
});

api.get('/user/namespace', function(req, res) {
  User.getNamespaceByUserID(req.session.user, function(data){
    namespace = data;
    console.log('namespace from api: ', namespace);
    res.send({namespace: namespace});
  });
});

module.exports = api;
