var io = require('../socket');

// collection with all sockets in application
var socketsMap = { };

// return socket instance for some NS if exist, 
// else - create new, add to socketsMap and return.
module.exports = function (ns) {
  if (socketsMap.hasOwnProperty(ns) && socketsMap[ns]!=null) {
    return socketsMap[ns];
  } else {
    socketsMap[ns] = io.of(ns);
    console.log('create new socket of (', ns, ')');
    socketsMap[ns].on('connection', socket => {
      console.log('socket of (', ns, ') - connected!');
      socket.on('disconnect', ()=>{
        console.log('socket of (', ns, ') - disconnected!');
        if (ns != '/') { 
          // socket cleanUp;
          socket.nsp._events = {};
          socket._events = {};
          socket.nsp._eventsCount = 0;
          socketsMap[ns]=null;
          // end socket cleanUp;
          
          console.log('socket of (', ns, ') - destroyed!');
        };
      });
    });
    return socketsMap[ns];
  }
};
