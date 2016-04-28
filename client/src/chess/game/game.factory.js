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

    function getMovesList(gameId) {
      var promise = $q(function(resolve, reject) {
      var moves;
      console.log(factory.gameId + ' my game id in getMovesList');
      if (factory.data.gameId === null) {
        $http.get(process.env.API_URL + '/api/game/id', {withCredentials: true}).
          then(function (response) {
            setGameId(response.data.gameId);
          }).
      then(function () {
        $http.get(process.env.API_URL + '/api/game/moves/:'+ factory.gameId, {withCredentials: true}).
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
        $http.get(process.env.API_URL + '/api/game/moves/:'+ factory.gameId, {withCredentials: true}).
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
      var promise = $q(function(resolve, reject) {
      var can;
      console.log(factory.data.gameId + ' my game id in sendMove');
      if (factory.data.gameId === null) {
        $http.get(process.env.API_URL + '/api/game/id', {withCredentials: true}).
          then(function (response) {
            setGameId(response.data.gameId);
          }).
        then(function () {
        //var data = {gameId: factory.gameId, move: move};
        $http.post(process.env.API_URL + '/api/game/checkmove', {gameId: factory.data.gameId, form: move.from, to: move.to}, {withCredentials: true}).
          then(function (response) {
            can = response.status;
            console.log('can i move? (no game id) ' + can);
            resolve({list: can});
        });
      });
    }
    else {
      (function () {
        console.log('game id exists and i send move to server ' + factory.data.gameId);
      //var data = {gameId: factory.gameId, form: move.form, to: move.to};
      //console.log({gameId: factory.gameId, form: move.form, to: move.to});
      $http.post(process.env.API_URL + '/api/game/checkmove', {gameId: factory.data.gameId, form: move.from, to: move.to}, {withCredentials: true}).
        then(function (response) {
          can = response.status;
          console.log('can i move? ' + can);
          resolve({list: can});
      });
    }());
    }
    });
    return promise;
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
      data: {},
      setGameInfo: function (data) {factory.data = data},
      getGameInfo: function () {return factory.data},
      getGameId: function () {return factory.data.gameId},
      setGameId: function (gameId) {factory.data.gemeId = gameId}
    };

    return factory;
}
