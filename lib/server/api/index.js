var express = require('express');
var api = express();

var mongoose = require("mongoose");
var User = mongoose.model('User');

var socketsManager = require('../sockets/sockets-manager');

api.get('/chess', function(req, res) {
  res.send({username: req.session.username});
});

api.get('/user/namespace', function(req, res) {
  User.getNamespaceByUserID(req.session.user, function(data){
    namespace = data;
    res.send({namespace: namespace});
  });
});

api.get('/usersonline', function(req, res) {
  User.getUsersOnline(req.session.user, function(data){
    res.send(data);
  });
});

api.get('/user/invite/send/:opponentID', function(req, res) {
  var opponentID = req.params.opponentID;
  User.getNamespaceByUserID(opponentID, function(data){
    namespace = data;
    socketsManager(namespace).emit('incommingInvite', {userID: req.session.user, name: req.session.name});
    console.log('emmit message to client via socket to', namespace);
    res.sendStatus(200);
  });
});

api.get('/user/invite/accept', function(req, res) {
  // code...
});


module.exports = api;
