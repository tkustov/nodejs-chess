var mongoose = require("mongoose");
// var Game = mongoose.model('Game');

exports.someMethod =  function(req, res) {
  res.send({someMethod: 'hi!'});
}
