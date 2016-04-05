var app = require('./app');
var server = require('./server');
var io = require('./socket');

var bodyParser = require('body-parser');
var ping = require('./ping');
var auth = require('./auth');
var api = require('./api');

var checkAuth = require('./auth/middleware/checkAuth');

server.listen(8081);

app.use(bodyParser.json());

app.use('/ping', ping);
app.use('/', auth);
app.use('/api', checkAuth, api);


// Move to sockets/index.js
io.on('connection', socket => {
  socket.emit('msg', 'hello world!');
});

io.of('someNS').on('connection', socket => {
  socket.emit('msg', 'hello user on someNS!');
});
