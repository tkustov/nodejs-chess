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
<<<<<<< HEAD
var ping = require('./ping');

=======
>>>>>>> 502d6816109bf7429280150c98c7229d56881afc

var app = express();
var server = Server(app);
var io = socket(server);
var MongoStore = connectMongo(session);
<<<<<<< HEAD

server.listen(8081);

app.use('/ping', ping);

app.use((req, res, next) => {
res.set({
'Access-Control-Allow-Origin': 'https://dev-chess-client-liamvm.c9users.io:8080',
'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
'Access-Control-Allow-Credentials': true
});
next();
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret:'say_friend_and_come_in',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: { maxAge: false},
  saveUninitialized: false,
  resave: false
}));
=======
>>>>>>> 502d6816109bf7429280150c98c7229d56881afc

app.use('/', routes);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret:'say_friend_and_come_in',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: { maxAge: false},
  saveUninitialized: false,
  resave: false
}));

app.use('/', routes);

io.on('connection', socket => {
  socket.emit('msg', 'hello world!');
});
