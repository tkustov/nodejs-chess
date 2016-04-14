var express = require('express');
var game = require('./game');
var user = require('./user');
var api = express();

api.use('/game', game);
api.use('/user', user);


module.exports = api;
