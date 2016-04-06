var express = require('express');
var api = express();

var mongoose = require("mongoose");
var User = mongoose.model('User');

var socketsManager = require('../sockets/sockets-manager');

api.get('/chess', function(req, res) {
  res.send({username: req.session.username});
});

api.get('/user/namespace', function(req, res) {
  User.getNamespaceByUserID(req.session.user, function(data, user){
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
  User.getNamespaceByUserID(opponentID, function(data, user){
    var namespace = data;
    socketsManager(namespace).emit('incommingInvite', {userID: req.session.user, userName: req.session.username});
    console.log('emmit message to client via socket to', namespace);
    res.sendStatus(200);
  });
});

api.get('/user/invite/accept/:opponentID', function(req, res) {
  var opponentID = req.params.opponentID;
  var userID = req.session.user;
  var opponentNamespace;
  var userNamespace;

  // var game = new Game (); or smth like that.
  // var game_id = game.getID();
  var game_id = 1;

  User.getNamespaceByUserID(opponentID, function(data, user){
    var namespace = data;
    socketsManager(namespace).emit('startGame', {gameID: game_id});
    user.updateStatus('in_game');
    console.log('emmit message to client via socket to', namespace);
  });
  User.getNamespaceByUserID(userID, function(data, user){
    var namespace = data;
    socketsManager(namespace).emit('startGame', {gameID: game_id});
    user.updateStatus('in_game');
    console.log('emmit message to client via socket to', namespace);
  });

  res.sendStatus(200);
});


module.exports = api;
