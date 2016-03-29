var path = require('path');
var express = require('express');
var Server = require('http').Server;
var socket = require('socket.io');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var connectMongo = require('connect-mongo');

require('./models/db');
var routes = require('./routes/index');
var ping = require('./ping');


var app = express();
var server = Server(app);
var io = socket(server);
var MongoStore = connectMongo(session);

server.listen(8080);

app.use('/ping', ping);

app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
    res.set({
    'Access-Control-Allow-Origin': req.get('Origin'),
    'Access-Control-Allow-Headers': ['Accept', 'Content-Type'].join(', '),
    'Access-Control-Allow-Credentials': true
    });
    next();
});


app.use(session({
  secret:'say_friend_and_come_in',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: { maxAge: 45 * 60 *1000 },
  saveUninitialized: false,
  resave: false
}));

app.use('/', routes);


io.on('connection', socket => {
  socket.emit('msg', 'hello world!');
});
