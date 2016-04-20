var app = require('./app');
var server = require('./server');
require('./sockets');

var bodyParser = require('body-parser');

var ping = require('./ping');
var auth = require('./auth');
var api = require('./api');

var checkAuth = require('./auth/middleware/checkAuth');

server.listen(8081);

app.use(bodyParser.json());

//Katya is an asshole. she fucked up auth by doing her shit. 
//!!!!!!!!!!UNCOMMENT EVERYTHING!!!!!!!!!!!!!!!!!!!!!!!
//for real uncomment everything!!!!

/*app.use('/ping', ping);*/
app.use('/', auth);
app.use('/api', /*checkAuth,*/ api);