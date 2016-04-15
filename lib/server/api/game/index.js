var express = require('express');
var gameRoutes = require('./routes');
var game = express();

game.use('/', gameRoutes);

module.exports = game;