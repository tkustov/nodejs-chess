var express = require('express');
var session = require('express-session');
var mongoose = require('mongoose');
var connectMongo = require('connect-mongo');


require('../db');
var MongoStore = connectMongo(session);
var routes = require('./routes');
var auth = express();



auth.use((req, res, next) => {
    res.set({
      'Access-Control-Allow-Origin': req.get('Origin'),
      'Access-Control-Allow-Headers': ['Accept', 'Content-Type'].join(', '),
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Methods': ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'].join(', ')
    });
    next();
});

auth.use(session({
  secret:'say_friend_and_come_in',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: { maxAge: 45 * 60 * 1000 },
  saveUninitialized: false,
  resave: true,
  rolling: true
}));

auth.use('/', routes);

module.exports = auth;
