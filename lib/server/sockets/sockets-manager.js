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
    return socketsMap[ns];
  }
};
