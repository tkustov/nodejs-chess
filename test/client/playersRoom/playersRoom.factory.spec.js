var assert = require('assert');
var angular = require('angular');
require('angular-mocks');
require('../../../client/src/chess/playersRoom');

describe('module: chess.playersRoom', function () {
  beforeEach(angular.mock.module('chess.playersRoom'));
  
  describe('playersRoom factory', function () {
    describe('playersRoom.getUsersOnline()', function () {
      it('sould be a function', inject(function (PlayersRoom) {
        assert.equal(typeof PlayersRoom.getUsersOnline, 'function');
      }));
      
      // it('should call a server', inject(function (auth, $httpBackend) {
      //   $httpBackend.expectPOST(process.env.API_URL + '/login').respond(200, {});
      //   auth.login('john_doe', 'password').
      //     then(
      //       function () { assert(true, '/auth/login'); },
      //       function () { assert(false, '/auth/login'); }
      //     );
      //   $httpBackend.flush();
      // }));

      // it('should handle server error', inject(function (auth, $httpBackend) {
      //   $httpBackend.expectPOST(process.env.API_URL + '/login').respond(404, {});
      //   auth.login('john_doe', 'password').
      //     then(
      //       function () { assert(false, '/auth/login'); },
      //       function () { assert(true, '/auth/login'); }
      //     );
      //   $httpBackend.flush();
      // }));
    });
  });
});
