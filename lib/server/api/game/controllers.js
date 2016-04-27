var mongoose = require("mongoose");
var Game = mongoose.model('Game');
var User = mongoose.model('User');

var game = new Game;

var socketsManager = require('./../../sockets/sockets-manager');
var gameSockets = socketsManager('game');

exports.acceptInvitation = function(req, res) {
  // if(!req.body.whitePlayer) {
  //   res.status(400).json({"message": "whitePlayer is required"});
  //   return false;
  // }
  var userId = req.session.user;
  var opponentId = req.params.userId;
  
  var game = new Game({
    whitePlayer: userId,
    blackPlayer: opponentId,
    allMoves: [],
  });

  game.save(function(err) {
    if(err) {
      res.status(400).json({"message": 'game creation error'});
    }
    res.status(201).json({"gameId" : game._id});
  });

  //writes game._id in allGames field of each player
  game.writeGameId(userId, opponentId, game._id, function(err, player) {
    if(err) {
      console.log("game creation error" + err);
    }
    console.log("game._id was written in allGames field of players");
  });
  
  game.generateGameRoom(game._id);

  //Send to both players gameId, and than they start game.
  User.findById({_id:userId}, function(err, user) {
    gameSockets.to(user.socketId).emit('startGame', {gameId: game._id, whitePlayer: userId, blackPlayer: opponentId});
  });

  User.findById({_id:opponentId}, function(err, opponent) {
    gameSockets.to(opponent.socketId).emit('startGame', {gameId: game._id, whitePlayer: userId, blackPlayer: opponentId});
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

      Game.findById({_id:req.body.gameId}, function(err, game) {
        var opponentId;
        if (req.session.user == game.whitePlayer) {
          opponentId = game.blackPlayer
        } else {
          opponentId = game.whitePlayer
        };
        User.findById({_id:opponentId}, function(err, opponent) {
          gameSockets.to(opponent.socketId).emit('opponentMove', {form: req.body.form, to:req.body.to});
        });
      });
    });
  });
};

exports.getGameRoom = function(req, res) {
  if(!req.params.id) {
    res.status(400).json({"message": "id of game is required"});
    return false;
  };
  
  Game.getGameRoom(req.params.id, function(err, room) {
    if(err) {
      res.status(400).json({"message": "game with that id doesn't exist"});
      return false;
    }
    res.status(200).json({"game room": room});
  });
};

exports.getLastGameId  = function(req, res) {
  Game.getLastGameId(req.session.user, function(err, gameId) {
    if(err) {
      res.status(400).json({"message": "user doesn't exist"});
    }
    res.status(200).json({"message": gameId});
  });
};

//send Invitation from one user to other user.
exports.sendInvitation = function (req, res) {
  var userId = req.session.user;
  var username = req.session.username;
  var opponentId = req.params.userId;

  User.findById({_id:opponentId}, function(err, opponent) {
    gameSockets.to(opponent.socketId).emit('incomingInv', {userId: userId, userName: username});
    console.log('sendInvitation from', username, 'to', opponent.username);
    res.sendStatus(200);
  });

}
