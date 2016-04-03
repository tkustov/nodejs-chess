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

io.on('connection', socket => {
  socket.emit('msg', 'hello world!');
});

