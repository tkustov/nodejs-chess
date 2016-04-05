module.exports = SocketFactory;

var io = require('socket.io-client');

SocketFactory.$inject = ['$rootScope', '$cacheFactory'];

function SocketFactory($rootScope, $cacheFactory) {
  var sockets = $cacheFactory('socket-connections');
  return function (namespace) {
    var ns = namespace? '/'+namespace: '/'; 
    var socket;
    if (!sockets.get(ns)) {
      sockets.put(ns, io.connect(process.env.API_URL+ns));
    }
    socket = sockets.get(ns);
    socket.on('disconnect', function () { sockets.remove(ns); })
    return {
      on: on.bind(null, socket),
      emit: emit.bind(null, socket)
    };
  };

  function on(socket, event, callback) {
    socket.on(event, function () {  
      var args = arguments;
      $rootScope.$apply(function () {
        callback.apply(socket, args);
      });
    })
  }

  function emit(socket, eventName, data, callback) {
    socket.emit(eventName, data, function () {
      var args = arguments;
      $rootScope.$apply(function () {
        if (callback) {
          callback.apply(socket, args);
        }
      });
    })
  }
};
