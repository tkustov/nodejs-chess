var express = require('express');
var bodyParser = require('body-parser');
var ping = express();

module.exports = ping;

ping.get('/', function (req, res) {
  res.set({
    'Access-Control-Allow-Origin': '*'
  });
  res.send('pong').end();
});

ping.post('/', function (req, res) {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': ['Accept', 'Content-Type'].join(', ')
  });
  res.send('pong').end();
});

ping.options('/cookie', function (req, res) {
  res.set({
    'Access-Control-Allow-Origin': req.get('Origin'),
    'Access-Control-Allow-Headers': ['Accept', 'Content-Type'].join(', '),
    'Access-Control-Allow-Credentials': true
  }).end();
});

ping.post('/cookie', bodyParser.json(), function (req, res) {
  var cname = req.body.name;
  var cval = req.body.value;
  res.set({
    'Access-Control-Allow-Origin': req.get('Origin'),
    'Access-Control-Allow-Headers': ['Accept', 'Content-Type'].join(', '),
    'Access-Control-Allow-Credentials': true
  });
  res.
    cookie(cname, cval, { httpOnly: true }).
    send('Cookie was set successfully. Open your developer tools, and take a look on Resources panel').
    end();
});
