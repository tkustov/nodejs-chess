var mongoose = require("mongoose");
var Game = mongoose.model('Game');
var User = mongoose.model('User');

var game = new Game;

var socketsManager = require('./../../sockets/sockets-manager');
var gameSockets = socketsManager('game');

exports.acceptInvitation = function(req, res) {

  var userId = req.session.user;
  var inviterId = req.params.userId;

  var game = new Game({
    whitePlayer: inviterId,
    blackPlayer: userId,
    allMoves: [],
  });

  game.save(function(err) {
    if(err) {
      res.status(400).json({"message": 'game creation error'});
    }
    res.status(201).json({"gameId" : game._id});
  });

  //writes game._id in allGames field of each player
  game.writeGameId(inviterId, userId, game._id, function(err, player) {
    if(err) {
      console.log("game creation error" + err);
    }
    console.log("game._id was written in allGames field of players");
  });

  game.generateGameRoom(game._id);

  //Send to both players gameId, and than they start game.
  User.findById({_id:userId}, function(err, user) {
    gameSockets.to(user.socketId).emit('startGame', {gameId: game._id, whitePlayer: inviterId, blackPlayer: userId});
  });

  User.findById({_id:inviterId}, function(err, inviter) {
    gameSockets.to(inviter.socketId).emit('startGame', {gameId: game._id, whitePlayer: inviterId, blackPlayer: userId});
  });

};

exports.getGameInfo = function(req, res) {
  if(!req.params.id) {
    res.status(400).json({"message": "id of game is required"});
    return false;
  };

  Game.getGameInfo(req.params.id, function(err, gameInfo) {
    if(err) {
      res.status(400).json({"message": "game with that id doesn't exist"});
    }
    else {
      res.status(200).json({"gameInfo": gameInfo});
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
    res.sendStatus(200);
  });

}

exports.cancelInvitation = function (req, res) {
  var userId = req.session.user;
  var username = req.session.username;
  var opponentId = req.params.userId;

  User.findById({_id:opponentId}, function(err, opponent) {
    gameSockets.to(opponent.socketId).emit('cancelInv', {userId: userId});
    res.sendStatus(200);
  });
}

exports.refuseInvitation = function (req, res) {
  var userId = req.session.user;
  var username = req.session.username;
  var opponentId = req.params.userId;

  User.findById({_id:opponentId}, function(err, opponent) {
    gameSockets.to(opponent.socketId).emit('refuseInv', {userId: userId});
    res.sendStatus(200);
  });
}

exports.getMessages = function (req, res) {
  var gameId = req.params.gameId;
  console.log(gameId);
  Game.findById({_id:gameId})
   .select('chat')
    .exec(function(err, chat) {
      if (err) {console.log(err.message)} else {res.send(chat)}})
}
