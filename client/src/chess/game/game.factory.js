module.exports = GameFactory;
var Board = require('../../../../lib/common/Board');
GameFactory.$inject = ['$http','$q'];
function GameFactory($http, $q)  {
  var gameId;
  var board = new Board ();
  function getState() {
      return board.getState();
  }
  function getMoves(form) {
      return board.getMoves(form);
  }
  function tryMove(form, to) {
      return board.tryMove(form, to);
  }
  function move(form, to) {
      return board.move(form, to);
  }
  function isFreeCell(form) {
      return board.isFreeCell(form);
  }
  function getPlayerColor(i) {
    var color;
    if (i & 1) {
      return color = 'white';
    }
    else {
      return color = 'black';
    }
  }

  function getLastGameId () {
    var promise = $q(function (resolve, reject) {
      $http.get(process.env.API_URL + '/api/game/id', {withCredentials: true}).
        then(function (response) {
          resolve(response.data.message);
       });
    });
    return promise;
  }
  function getMovesList() {
    var promise = $q(function(resolve, reject) {
      $http.get(process.env.API_URL + '/api/game/gameinfo/'+ factory.gameId, {withCredentials: true}).
        then(function (response) {
          var tmpData = JSON.parse(response.data.gameInfo);
          var tmpWhite = tmpData.whitePlayer;
          var tmpBlack = tmpData.blackPlayer;
          factory.whitePlayer = tmpWhite;
          factory.blackPlayer = tmpBlack;
          factory.moves = tmpData.allMoves;
          factory.moves = factory.moves.map(function (item, i) {
            if (i === 0) {
              item.user = factory.whitePlayer;
            }
            if (i & 1) {
              item.user = factory.blackPlayer;
            }
            else {
              item.user = factory.whitePlayer;
            }
            return item;
          });
          resolve({list: factory.moves, white: tmpWhite, black: tmpBlack});
       });
  });
  return promise;
  }
  function sendMove(move) {
    var promise = $q(function(resolve, reject) {
    var can;
      $http.post(process.env.API_URL + '/api/game/checkmove', {gameId: factory.gameId, form: move.from, to: move.to}, {withCredentials: true}).
        then(function (response) {
          can = response.status;
          resolve({list: can});
      });
    });
    return promise;
  }

  function getBoardState (prom) {
    var promise = $q(function(resolve, reject) {
      var movesList = prom.list
      var item;
      var itemI;
      var i;
      var data = {};
      if (movesList.length === 0) {
        data.playerColor = getPlayerColor(movesList.length - 1);
        data.boardState = board.getState();
        resolve(data);
      }
      else {
        movesList.forEach(function(item, i, movesList) {
            board.move(item.form, item.to);
        });
        data.boardState = board.getState();
        data.playerColor = getPlayerColor(movesList.length - 1);
        resolve(data);
      }
    });
      return promise;
  }

  var factory = {
    getMoves: getMoves,
    tryMove: tryMove,
    move: move,
    getState: getState,
    isFreeCell:isFreeCell,
    getBoardState: getBoardState,
    sendMove: sendMove,
    getPlayerColor: getPlayerColor,
    getMovesList: getMovesList,
    gameId: null,
    data: null,
    moves: [],
    whitePlayer: null,
    blackPlayer: null,
    color: null,
    whitePlayerName: null,
    blackPlayerName: null,
    moveFlag: null,
    setMoveFlag: function (flag) {factory.moveFlag = flag;},
    getMoveFlag: function () {return factory.moveFlag;},
    setGameColor: function (color) {factory.color = color;},
    getGameColor: function () {return factory.color;},
    getFactoryMoves: function () {return factory.moves;},
    setFactoryMoves: function (data) {factory.moves.push(data);},
    popFactoryMoves: function () {factory.moves.pop();},
    setGameInfo: function (data) {factory.data = data;},
    getGameInfo: function () {
      if (factory.data === null) {
        data = {
          blackPlayer: factory.blackPlayer,
          whitePlayer: factory.whitePlayer,
          blackPlayerName: factory.blackPlayerName,
          whitePlayerName: factory.whitePlayerName
        };
        return data;
      }
      return factory.data;
    },
    getGameId: function () {return factory.gameId},
    setGameId: function (gameId) {factory.gameId = gameId},
    getLastGameId: getLastGameId
  };

  return factory;
}
