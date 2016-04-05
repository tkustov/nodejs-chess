var io = require('../socket');

// collection with all sockets in application
var socketsMap = { 
  '/': io.of('/')
};

// return socket instance for some NS if exist, 
// else - create new, add to socketsMap and return.
module.exports = function (ns) {
  if (socketsMap.hasOwnProperty(ns)) {
    return socketsMap[ns];
  } else {
    socketsMap[ns] = io.of(ns);
    if (ns != '/') {
      socketsMap[ns].on('disconnect', function () {
        socketsMap[ns]=null;
      })
    }
    return socketsMap[ns];
  }
};
