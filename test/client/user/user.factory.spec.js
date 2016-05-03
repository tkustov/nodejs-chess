var assert = require('assert');
var angular = require('angular');
require('angular-mocks');
require('../../../client/src/chess/user');

describe('module: chess.user', function () {
  beforeEach(angular.mock.module('chess.user'));

  describe('user factory', function () {
    describe('user.isLoggedIn()', function () {
      it('should be a function', inject(function(user) {
        assert.equal(typeof user.isLoggedIn, 'function');
      }));
      
      it('return true if user exists', inject(function(user) {
        user.userInfo = {};
        assert.equal(user.isLoggedIn(), true);
      }));
      
      it('return false if user doesn`t exist', inject(function(user) {
        user.userInfo = null;
        assert.equal(user.isLoggedIn(), false);
      }));
    });
    
    describe('user.getUserInfo()', function(){
      it('should be a function', inject(function(user) {
        assert.equal(typeof user.getUserInfo, 'function');
      }));
      
      it('fetch user data from the server', inject(function(user, $httpBackend){
        $httpBackend.expectGET(process.env.API_URL + '/api/user/info').respond(200, {});
        user.getUserInfo().
          then(function() {
            assert.equal(user.isLoggedIn(), true);
          });
        $httpBackend.flush();
      }));
      
      it('assigns fetched data to the variable', inject(function(user, $httpBackend){
        $httpBackend.
          expectGET(process.env.API_URL + '/api/user/info').
          respond(200, {
            username: 'Bruno Mars'
          });
        user.getUserInfo().
          then(function() {
            assert.equal(user.userInfo.hasOwnProperty('username'), true);
            assert.equal(user.userInfo.username, 'Bruno Mars' );
          });
        $httpBackend.flush();
      }));
    });
    
  });
})