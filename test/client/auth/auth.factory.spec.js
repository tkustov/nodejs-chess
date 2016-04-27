var assert = require('assert');
var angular = require('angular');
require('angular-mocks');
require('../../../client/src/chess/auth');

describe('module: chess.auth', function () {
  beforeEach(angular.mock.module('chess.auth'));
  
  describe('auth factory', function () {
    describe('auth.login()', function () {
      it('sould be a function', inject(function (auth) {
        assert.equal(typeof auth.login, 'function');
      }));
      
      it('should call a server', inject(function (auth, $httpBackend) {
        $httpBackend.expectPOST(process.env.API_URL + '/login').respond(200, {});
        auth.login('john_doe', 'password').
          then(
            function () { assert(true, '/auth/login'); },
            function () { assert(false, '/auth/login'); }
          );
        $httpBackend.flush();
      }));

      it('should handle server error', inject(function (auth, $httpBackend) {
        $httpBackend.expectPOST(process.env.API_URL + '/login').respond(404, {});
        auth.login('john_doe', 'password').
          then(
            function () { assert(false, '/auth/login'); },
            function () { assert(true, '/auth/login'); }
          );
        $httpBackend.flush();
      }));
    });
  });
});
