var express = require('express');
var Server = require('http').Server;
var socket = require('socket.io');
var bodyParser = require('body-parser');
var ping = require('./ping');
var auth = require('./auth');
var api = require('./api');
var app = express();
var server = Server(app);
var io = socket(server);
var checkAuth = require('./auth/middleware/checkAuth');
server.listen(8081);
app.use(bodyParser.json());
app.use('/ping', ping);
app.use('/', auth);
app.use('/api', checkAuth, api);
io.on('connection', socket => {
socket.emit('msg', 'hello world!');
});