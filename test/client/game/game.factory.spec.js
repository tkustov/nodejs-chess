var assert = require('assert');
var angular = require('angular');
require('angular-mocks');
require('../../../client/src/chess/game');

describe('module: chess.game', function () {
  beforeEach(angular.mock.module('chess.game'));

  describe('game factory', function () {

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
    });

  });
});
