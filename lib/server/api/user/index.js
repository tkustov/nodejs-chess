var express = require('express');
var userRoutes = require('./routes');
var user = express();


user.use('/', userRoutes);

module.export = user;