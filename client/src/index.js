var io = require('socket.io-client');
var chess = require('./chess');
var socket = io(process.env.API_URL);

socket.on('connect', function () {
  console.log('connected!');
});
