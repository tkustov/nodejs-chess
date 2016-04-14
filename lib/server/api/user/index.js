var express = require('express');
var userRoutes = require('./routes');
var user = express();

user.use('/', userRoutes);

module.exports = user;
