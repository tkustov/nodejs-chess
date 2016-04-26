var mongoose = require("mongoose");
var Game = mongoose.model('Game');
var User = mongoose.model('User');

var game = new Game;

//no ids. just usernames
exports.createNewGame = function(req, res) {
  if(!req.body.whitePlayer) {
    res.status(400).json({"message": "whitePlayer is required"});
    return false;
  }
  
  var game = new Game({
    whitePlayer: req.body.whitePlayer,
    blackPlayer: req.body.blackPlayer,
    allMoves: [],
  });

  game.save(function(err) {
    if(err) {
      res.status(400).json({"message": 'game creation error'});
    }
    res.status(201).json({"gameId" : game._id});
  });

  //writes game._id in allGames field of each player
  game.writeGameId(req.body.whitePlayer, req.body.blackPlayer, game._id, function(err, player) {
    if(err) {
      console.log("game creation error" + err);
    }
    console.log("game._id was written in allGames field of players");
  });
};

exports.getAllMoves = function(req, res) {
  if(!req.params.id) {
    res.status(400).json({"message": "id of game is required"});
    return false;
  };
  
  Game.getAllMoves(req.params.id, function(err, moves) {
    if(err) {
      res.status(400).json({"message": "game with that id doesn't exist"});
    }
    else {
      res.status(200).json({"moves": moves});
    }
  });
};

exports.validation = function(req, res) {
  if(!(req.body.gameId && req.body.form && req.body.to)) {
    res.status(400).json({"message":  "gameId, form, to are required"});
    return false;
  };
  
  Game.validation(req.body.gameId, req.body.form, req.body.to, function(err, data){
    if(err == false) {
      res.status(400).json({"message": "invalid move"});
      return false;
    };
    
    Game.writeMove(req.body.gameId, req.body.form, req.body.to, function(err, data) {
      if(err) {
        res.status(400).json({"message": "writing move error"});
      }
      res.status(201).json({"message": "move was written"});
    });
  });
};

