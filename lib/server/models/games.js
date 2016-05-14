var mongoose = require( 'mongoose' );
var User = mongoose.model('User');
var Board = require('../../common/Board');
var crypto = require("crypto");

var gameSchema = new mongoose.Schema({
    chat: {
      type : Array,
      "default" : []
    },
    whitePlayer: {type: String, required: true},
    blackPlayer: String,
    allMoves: [{
      form: String,
      to: String
    }],
    gameRoom: String
});

gameSchema.methods.generateGameRoom = function(gameId) {
  var gameRoom = crypto.createHash('md5').update(gameId + new Date().getTime().toString()).digest('hex');
  this.gameRoom = gameRoom;
};

gameSchema.methods.writeGameId = function(whitePlayer, blackPlayer, gameId, callback) {
  User.update({_id: whitePlayer}, {$push: {allGames: gameId}}, function(err, player) {
    if(err) {
      callback(err);
    }
    callback(null, player);
  });
  User.update({_id: blackPlayer}, {$push: {allGames: gameId}}, function(err, player) {
    if(err) {
      callback(err);
    }
    callback(null, player);
  });
};

gameSchema.statics.getGameInfo = function(gameId, callback) {
  var Game = this;

  Game.findOne({_id: gameId}, function(err, game) {
    if(err) {
      callback(err);
    }
    else {
      callback(null, JSON.stringify(game));
    }
  });
};

gameSchema.statics.getGameRoom = function(gameId, callback) {
  var Game = this;

  Game.findOne({_id: gameId}, function(err, game) {
    if(err) {
      callback(err);
    }
    else {
      callback(null, game.gameRoom);
    }
  });
};

gameSchema.statics.writeMove = function(gameId, form, to, callback) {
  var Game = this;

  Game.update({_id: gameId}, {$push:{allMoves:{form: form, to: to}}}, function(err, data) {
    if(err) {
      callback(err);
    }
    callback(null, data);
  });
};

gameSchema.statics.validation = function(gameId, form, to, callback) {
  var Game = this;
  var board = new Board();

  Game.findOne({_id: gameId}, function(err, game) {
    if(err) {
      callback(err);
    }
    else {

      var allMoves = JSON.stringify(game.allMoves);
      allMoves = JSON.parse(allMoves);

      for (var i = 0; i < allMoves.length; i++) {
        board.move(allMoves[i].form, allMoves[i].to);
      }

      var valid = board.tryMove(form, to);
      if(valid){
        callback(null, game);
      }
      else {
        callback(false);
      }
    }
  });
};

gameSchema.statics.getLastGameId = function(userId, callback) {
  User.findOne({_id: userId}, function(err, user) {
    if(err) {
      callback(err);
    }
    else {
      var allGames = JSON.stringify(user.allGames);
      allGames = JSON.parse(allGames);

      var lastGameId = allGames[allGames.length - 1];
      console.log(lastGameId);
      callback(null, lastGameId);
    }
  });
};

module.exports = mongoose.model('Game', gameSchema);
