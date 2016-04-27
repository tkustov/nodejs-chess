var assert = require('assert');
var angular = require('angular');
require('angular-mocks');
require('../../../client/src/chess/auth');

describe('module: chess.auth', function () {
  beforeEach(angular.mock.module('chess.auth'));

  describe('auth.factory', function () {

// test login function

    describe('auth.login()', function () {
      it('sould be a function', inject(function (auth) {
        assert.equal(typeof auth.login, 'function');
      }));

      it('should call a server', inject(function (auth, $httpBackend) {
        $httpBackend.expectPOST(process.env.API_URL + '/login').respond(200, {});
        auth.login('some username', 'password').
          then(
            function () { assert(true, '/auth/login'); },
            function () { assert(false, '/auth/login'); }
          );
        $httpBackend.flush();
      }));

      it('should handle server error', inject(function (auth, $httpBackend) {
        $httpBackend.expectPOST(process.env.API_URL + '/login').respond(401, {});
        auth.login('some username', 'password').
          then(
            function () { assert(false, '/auth/login'); },
            function () { assert(true, '/auth/login'); }
          );
        $httpBackend.flush();
      }));
    });

// test registration function

    describe('auth.register()', function () {
      it('sould be a function', inject(function (auth) {
        assert.equal(typeof auth.register, 'function');
      }));

      it('should call a server', inject(function (auth, $httpBackend) {
        $httpBackend.expectPOST(process.env.API_URL + '/register').respond(200, {});
        auth.register('email@example.com', 'some username', 'password').
          then(
            function () { assert(true, '/auth/register'); },
            function () { assert(false, '/auth/register'); }
          );
        $httpBackend.flush();
      }));

      it('should handle server error', inject(function (auth, $httpBackend) {
        $httpBackend.expectPOST(process.env.API_URL + '/register').respond(404, {});
        auth.register('email@example.com', 'some username', 'password').
          then(
            function () { assert(false, '/auth/register'); },
            function () { assert(true, '/auth/register'); }
          );
        $httpBackend.flush();
      }));
    });

// test logout function

    describe('auth.logout()', function () {
      it('sould be a function', inject(function (auth) {
        assert.equal(typeof auth.logout, 'function');
      }));

      it('should call a server', inject(function (auth, $httpBackend) {
        $httpBackend.expectPOST(process.env.API_URL + '/logout').respond(200, {});
        auth.logout().
          then(
            function () { assert(true, '/auth/logout'); },
            function () { assert(false, '/auth/logout'); }
          );
        $httpBackend.flush();
      }));

      it('should handle server error', inject(function (auth, $httpBackend) {
        $httpBackend.expectPOST(process.env.API_URL + '/logout').respond(404, {});
        auth.logout().
          then(
            function () { assert(false, '/auth/logout'); },
            function () { assert(true, '/auth/logout'); }
          );
        $httpBackend.flush();
      }));
    });

  });
});
