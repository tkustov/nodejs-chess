var io = require('../socket');

var socketsMap = { };

module.exports = function (ns) {
  if (socketsMap.hasOwnProperty(ns) && socketsMap[ns]!=null) {
    return socketsMap[ns];
  } else {
    socketsMap[ns] = io.of(ns);
    return socketsMap[ns];
  }
};
