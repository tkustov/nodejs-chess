module.exports = GameFactory;
var Board = require('../../../../lib/common/Board');
GameFactory.$inject = ['$http'];
function GameFactory($http)  {
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

    function getMovesList(gameId) {
      var promise = new Promise(function(resolve, reject) {
      var moves;
      console.log(gameId + ' my game id in getMovesList');
      if (gameId === undefined) {
        $http.get(process.env.API_URL + '/api/game/id', {withCredentials: true}).
          then(function (response) {
            gameId = response.data.gameId;
          }).
      then(function () {
        $http.get(process.env.API_URL + '/api/game/moves/:'+ gameId, {withCredentials: true}).
         then(function (response) {
             moves = response.data;
             console.log('my moves (no game id) '+ moves);
             resolve({list: moves});
         });
      });
    }
    else {
      (function () {
        console.log('game id exists and i ask server to give me moves list');
        $http.get(process.env.API_URL + '/api/game/moves/:'+ gameId, {withCredentials: true}).
         then(function (response) {
           moves = response.data;
           console.log('my moves '+ moves);
             resolve({list: moves});
         });
      }());
    }
    });
    return promise;
  }
    function sendMove(move) {
      var promise = new Promise(function(resolve, reject) {
      var can;
      console.log(gameId + ' my game id in sendMove');
      if (gameId === undefined) {
        $http.get(process.env.API_URL + '/api/game/id', {withCredentials: true}).
          then(function (response) {
            gameId = response.data.gameId;
          }).
        then(function () {
        var data = {gameId: gameId, move: move};
        $http.post(process.env.API_URL + '/api/game/checkmove', data, {withCredentials: true}).
          then(function (response) {
            can = response.data;
            console.log('can i move? (no game id) ' + can);
            resolve({list: can});
        });
      });
    }
    else {
      (function () {
        console.log('game id exists and i send move to server');
      var data = {gameId: gameId, move: move};
      $http.post(process.env.API_URL + '/api/game/checkmove', data, {withCredentials: true}).
        then(function (response) {
          can = response.data;
          console.log('can i move? ' + can);
          resolve({list: can});
      });
    }());
    }
    });
    return promise;
  }
    function setGameId (gameId) {
      gameId = gameId;
    }
    function getBoardState (prom) {
    var promise = new Promise (function(resolve, reject) {
        var movesList = [];
        movesList[0] = prom.list.from;
        movesList[1] = prom.list.to;
        console.log(movesList);
        var item;
        var i;
        var data = {};
        if (movesList === []) {
          data.boardState = board.getState();
          data.playerColor = getPlayerColor(movesList.length - 1);
          resolve({state: data});
        }
        else {
          movesList.forEach(function(item, i, movesList) {
            board.move(item.from, item.to);
          });
          data.boardState = board.getState();
          data.playerColor = getPlayerColor(movesList.length - 1);
          resolve({state: data});
        }
    });
      return promise;
    }
    return {
      getMoves: getMoves,
      tryMove: tryMove,
      move: move,
      getState: getState,
      isFreeCell:isFreeCell,
      getBoardState: getBoardState,
      setGameId: setGameId,
      sendMove: sendMove,
      getPlayerColor: getPlayerColor,
      getMovesList: getMovesList
    };
}
