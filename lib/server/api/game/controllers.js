var mongoose = require("mongoose");
var Game = mongoose.model('Game');
var User = mongoose.model('User');

var game = new Game;

//no ids. just usernames
exports.createNewGame = function(req, res) {
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
  Game.findOne({_id: req.params.id}, function(err, data) {
    if(err) {
      res.status(404).json({"message": "no moves were found"});
    }
    JSON.stringify(data.allMoves);
    res.status(200).json({"moves": JSON.stringify(data.allMoves)});
  });
};

exports.writeMove = function(req, res) {
  Game.update({_id: req.body.id}, {$push:{allMoves:{form: req.body.form, to: req.body.to}}}, function(err, data) {
    if (err) {
      res.status(401).json({"message": "writing move error"});
    }
    res.status(201).json({"message": "move was written"});
  });
};