var socketsManager = require('./sockets-manager');

//create general BUS (root) socket:
socketsManager('/');

// emit message to general BUS every 5 seconds (for example):
callNTimes(100, 15000, function() {
  socketsManager('/').emit('msg', "msg from server to general BUS");
});

// function for cyclic calling some function with delay in ms
function callNTimes(n, time, fn) {
  function callFn() {
    if (--n < 0) return;
    fn();
    setTimeout(callFn, time);
  }
  setTimeout(callFn, time);
}