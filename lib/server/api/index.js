var express = require('express');
var game = require('./game');
var user = require('./user');
var api = express();




api.use('/game', game);
api.use('/user', user);







var mongoose = require("mongoose");
var User = mongoose.model('User');

var socketsManager = require('../sockets/sockets-manager');

api.get('/chess', function(req, res) {
  res.send({username: req.session.username});
});
api.get('/records', function(request, response) {
	var records = [
		{userName: 'Ivan', score: Math.floor(Math.random() * (100 - 10 + 1) + 10) },
		{userName: 'Petro', score: Math.floor(Math.random() * (100 - 10 + 1) + 10) },
		{userName: 'Foo', score: Math.floor(Math.random() * (100 - 10 + 1) + 10) },
		{userName: 'Bar', score: Math.floor(Math.random() * (100 - 10 + 1) + 10) },
	];
	response.send(records);
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

  socketsManager('/').emit('updateUsersList')

  res.sendStatus(200);
});

api.get('/game/send-move/:tmp', function(req, res) {

  tmp = JSON.parse(req.params.tmp);
  console.log(req.params.tmp);
  // console.log('move');
  res.sendStatus(200);
});


module.exports = api;