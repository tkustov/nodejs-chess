var assert = require('assert');
var angular = require('angular');
require('angular-mocks');
require('../../../client/src/chess/game');

describe('module: chess.game', function () {
  beforeEach(angular.mock.module('chess.game'));

  describe('game factory', function () {
    describe('game.sendMove()', function () {

      it ('shoul be a function', inject(function (Game) {
        assert.equal(typeof Game.sendMove, 'function', 'OOps it is not a function');
      }));

      // it('should send move into server for validation', inject(function (Game, $httpBackend) {
      //   Game.setGameId(1);
      //   Game.sendMove({from: 'a2', to: 'a3'}).
      //     then (function (prom) {
      //       assert.equal(prom.list, 400, 'Some message');
      //     });
      //   // $httpBackend.expectPOST(process.env.API_URL + '/api/game/checkmove' + {gameId: 1, from: 'a2', to: 'a3'}).respond(201, {"message": "move was written"});
      //   // Game.sendMove({from: 'a2', to: 'a3'}).
      //     // then(
      //       // assert(true,'/api/game/checkmove');
      //       // assert(false, '/api/game/checkmove');
      //     // );
      //   // $httpBackend.flush();
      // }));
      // it('should handle server error', inject(function (Game, $httpBackend) {
      //   Game.setGameId(1);
      //   $httpBackend.expectPOST(process.env.API_URL + '/api/game/checkmove' + {gameId: 1, from: 'a2', to: 'a3'}).respond(400, {"message": "invalid move"});
      //
      // //  assert(false, '/api/game/checkmove');
      //  assert(true, '/api/game/checkmove');
      //
      //   // $httpBackend.flush();
      // }));

    });

    describe('Some small Game methods', function () {
      it ('should get null from Game.moveFlag, because it is not setted', inject(function (Game) {
        assert.strictEqual(Game.moveFlag, null, 'It is not null at the beginning');
      }));
      it ('should get true from Game.moveFlag, because it was setted', inject(function (Game) {
        Game.setMoveFlag(true);
        assert.equal(Game.moveFlag, true, 'It is not true after setting');
      }));
    });

    describe('Testing if Game.setGameInfo and Game.getGameInfo', function () {
      it ('should get null from Game.whitePlayer, Game.blackPlayer, Game.whitePlayerName,\
       Game.blackPlayerName, because they are not setted', inject(function (Game) {
        assert.strictEqual(Game.blackPlayer, null, 'It is not null at the beginning');
        assert.strictEqual(Game.whitePlayer, null, 'It is not null at the beginning');
        assert.strictEqual(Game.blackPlayerName, null, 'It is not null at the beginning');
        assert.strictEqual(Game.whitePlayerName, null, 'It is not null at the beginning');
      }));
      it ('should perform Game.setGameInfo and get it', inject(function (Game) {
        Game.data = null;
        var data = {blackPlayer: 1, whitePlayer: 2, blackPlayerName: 'vasa', whitePlayerName: 'pedro'};
        Game.setGameInfo(data);
        assert.equal(Game.data, data, 'Game info was not setted properly');
      }));
    });

    describe ('Testing of Game.getBoardState method' , function () {
      it ('Game.getBoardState should get empty array and return value, equal to Game.getState() at the beginning of a game' ,
       inject(function (Game) {
         var prom = {};
         prom.list = [];
         var boardState = Game.getState();
         var data;
         data = Game.getBoardState(prom);
         data = data.$$state.value.boardState;
         assert.deepEqual(data, boardState, 'If moves list is empty, function return not a return value of Game.getState');
       }
         ));
       it ('Game.getBoardState should get not an empty array (filled with moves) and return value,  equal  Game.getState moved on input array' ,
        inject(function (Game) {
          var prom = {};
          prom.list = [{form: 'a2', to: 'a3'},{form: 'b2', to: 'b3'},{form: 'c2', to: 'c3'}];
          var boardState = Game.getState();
          var afterMoving;
          var tmp = prom.list;
          tmp.forEach(function (item, i, tmp) {
            Game.move(item.form, item.to)
          });
          afterMoving = Game.getState();
          var data;
          data = Game.getBoardState(prom);
          data = data.$$state.value.boardState;
          assert.deepEqual(data, afterMoving, 'If moves list is filled, function doesnt return Game.getState with moved pieces');
        }
    ));
    // it ('Game.getBoardState should get not an empty array and return value, Not equal to Game.getState() after moving' ,
    //  inject(function (Game) {
    //    var prom = {};
    //    prom.list = [];
    //    var boardState = Game.getState();
    //    Game.getBoardState(prom).
    //      then(function(data) {
    //        assert.equal(data, boardState, 'If moves list is empty, function return not a return value of Game.getState after moving');
    //      });
    //   }
    // ));
    });

  });
});
