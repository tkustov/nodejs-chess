var express = require('express');
var session = require('express-session');
var mongoose = require('mongoose');
var connectMongo = require('connect-mongo');

require('./models/db');
var MongoStore = connectMongo(session);
var routes = require('./routes/index');
var auth = express();


auth.use((req, res, next) => {
    res.set({
      'Access-Control-Allow-Origin': req.get('Origin'),
      'Access-Control-Allow-Headers': ['Accept', 'Content-Type'].join(', '),
      'Access-Control-Allow-Credentials': true
    });
    next();
});

auth.use(session({
  secret:'say_friend_and_come_in',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: { maxAge: 45 * 60 * 1000, httpOnly: true  },
  saveUninitialized: false,
  resave: false
}));

auth.use('/', routes);

module.exports = auth;