var mongoose = require( 'mongoose' );
var User = mongoose.model('User');

var gameSchema = new mongoose.Schema({
    chat: { 
      type : [String], 
      "default" : [] 
    },
    whitePlayer: {type: String, required: true},
    blackPlayer: String,
    allMoves: [{
      form: String,
      to: String
    }]
});

gameSchema.methods.writeGameId = function(whitePlayer, blackPlayer, gameId, callback) {
  User.update({username: whitePlayer}, {$push: {allGames: gameId}}, function(err, player) {
    if(err) {
      callback(err);
    }
    callback(null, player);
  });
  User.update({username: blackPlayer}, {$push: {allGames: gameId}}, function(err, player) {
    if(err) {
      callback(err);
    }
    callback(null, player);
  });
};

module.exports = mongoose.model('Game', gameSchema);