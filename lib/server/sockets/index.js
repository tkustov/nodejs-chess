var socketsManager = require('./sockets-manager');

//create general BUS (root) socket:
// socketsManager('/');

socketsManager('game').on('connection', socket => {
  socket.on('join', (room)=>{
    socket.join(room);
    console.log('user joined to', room);
  })
});
