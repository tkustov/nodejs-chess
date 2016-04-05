var socketsManager = require('./sockets-manager');

// examples
var generalBus = socketsManager('/');

generalBus.on('connection', socket => {
  socket.emit('msg', 'Hello unknown user!');
});

socketsManager('someNS').on('connection', socket => {
  socket.emit('msg', 'hello user on someNS!');
});
