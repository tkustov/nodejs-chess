var assert = require('assert');
var angular = require('angular');
require('angular-mocks');
require('../../../client/src/chess/playersRoom');

describe('module: chess.playersRoom', function () {
  beforeEach(angular.mock.module('chess.playersRoom'));
  
  describe('playersRoom factory', function () {
    describe('playersRoom.getUsersOnline()', function () {
      it('should be a function', inject(function (PlayersRoom) {
        assert.equal(typeof PlayersRoom.getUsersOnline, 'function');
      }));

      it('add new user', inject(function (PlayersRoom) {
        PlayersRoom.newUser({id: 'someId1', name: 'test'});
        assert.equal(PlayersRoom.getUsersOnline().length, 1);
      }));

      it('remove user', inject(function (PlayersRoom) {
        PlayersRoom.newUser({id: 'someId1', name: 'test'});
        PlayersRoom.removeUser('someId1');
        assert.equal(PlayersRoom.getUsersOnline().length, 0);
      })); 

      it('add users with same ids', inject(function (PlayersRoom) {
        PlayersRoom.newUser({id: 'someId1', name: 'test1'});
        PlayersRoom.newUser({id: 'someId1', name: 'test2'});
        assert.equal(PlayersRoom.getUsersOnline().length, 1);
      })); 

      it('checkUserStatus', inject(function (PlayersRoom) {
        PlayersRoom.newUser({id: 'someId1', name: 'test1'});
        assert.equal(PlayersRoom.getUsersOnline()[0].status, 'free');
      })); 

      it('changeUserStatus', inject(function (PlayersRoom) {
        PlayersRoom.newUser({id: 'someId1', name: 'test1'});
        PlayersRoom.changeUserStatus('someId1', 'pending');
        assert.equal(PlayersRoom.getUsersOnline()[0].status, 'pending');
      }));

    });
  });
});
