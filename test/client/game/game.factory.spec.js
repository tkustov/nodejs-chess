var assert = require('assert');
var angular = require('angular');
require('angular-mocks');
require('../../../client/src/chess/game');

describe('module: chess.game', function () {
  beforeEach(angular.mock.module('chess.game'));

  describe('game factory', function () {
    describe('game.sendMove()', function () {
      it('should send move into server for validation', inject(function (Game, $httpBackend) {
        Game.setGameId(1);
        $httpBackend.expectPOST(process.env.API_URL + '/api/game/checkmove').respond(201, {"message": "move was written"});
        Game.sendMove({form: 'a2', to: 'a3'}).
          then(
            function () { assert(true, '/api/game/checkmove'); },
            function () { assert(false, '/api/game/checkmove'); }
          );
        $httpBackend.flush();
      }));
      it('should handle server error', inject(function (Game, $httpBackend) {
        Game.setGameId(1);
        $httpBackend.expectPOST(process.env.API_URL + '/api/game/checkmove').respond(400, {"message": "invalid move"});
        Game.sendMove({form: 'a3', to: 'a2'}).
          then(
            function () { assert(false, '/api/game/checkmove'); },
            function () { assert(true, '/api/game/checkmove'); }
          );
        $httpBackend.flush();
      }));

    });

  });
});
