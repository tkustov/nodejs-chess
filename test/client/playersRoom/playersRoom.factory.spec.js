var assert = require('assert');
var angular = require('angular');
require('angular-mocks');
require('../../../client/src/chess/playersRoom');

describe('module: chess.playersRoom', function () {
  beforeEach(angular.mock.module('chess.playersRoom'));
  
  describe('playersRoom factory', function () {

    it('getUsersOnline() should be a function', inject(function (PlayersRoom) {
      assert.equal(typeof PlayersRoom.getUsersOnline, 'function');
    }));

    it('can add new user', inject(function (PlayersRoom) {
      assert.equal(PlayersRoom.getUsersOnline().length, 0);
      PlayersRoom.newUser({id: 'someId1', name: 'test'});
      assert.equal(PlayersRoom.getUsersOnline().length, 1);
    }));

    it('can remove user', inject(function (PlayersRoom) {
      assert.equal(PlayersRoom.getUsersOnline().length, 0);
      PlayersRoom.newUser({id: 'someId1', name: 'test'});
      assert.equal(PlayersRoom.getUsersOnline().length, 1);
      PlayersRoom.removeUser('someId1');
      assert.equal(PlayersRoom.getUsersOnline().length, 0);
    })); 

    it('can`t add users with same ids', inject(function (PlayersRoom) {
      assert.equal(PlayersRoom.getUsersOnline().length, 0);
      PlayersRoom.newUser({id: 'someId1', name: 'test1'});
      PlayersRoom.newUser({id: 'someId1', name: 'test2'});
      assert.equal(PlayersRoom.getUsersOnline().length, 1);
    })); 

    it('set `free` status for new user', inject(function (PlayersRoom) {
      PlayersRoom.newUser({id: 'someId1', name: 'test1'});
      assert.equal(PlayersRoom.getUsersOnline()[0].status, 'free');
    })); 

    it('can changeUserStatus', inject(function (PlayersRoom) {
      PlayersRoom.newUser({id: 'someId1', name: 'test1'});
      assert.equal(PlayersRoom.getUsersOnline()[0].status, 'free');
      PlayersRoom.changeUserStatus('someId1', 'pending');
      assert.equal(PlayersRoom.getUsersOnline()[0].status, 'pending');
    }));

    it('should fetch Users Online', inject(function (PlayersRoom, $httpBackend) {
      assert.equal(PlayersRoom.getUsersOnline().length, 0);
      $httpBackend.expectGET(process.env.API_URL + '/api/user/users-online/').
      respond(200, [{id: "someId1", name: "test1"}]);
      PlayersRoom.fetchUsersOnline().then(function() {
        assert.equal(PlayersRoom.getUsersOnline().length, 1);
        assert.equal(PlayersRoom.getUsersOnline()[0].hasOwnProperty('name'), true);
        assert.equal(PlayersRoom.getUsersOnline()[0].name, 'test1' );
      });
      $httpBackend.flush();
    }));

    it('should clear users-online list', inject(function (PlayersRoom) {
      assert.equal(PlayersRoom.getUsersOnline().length, 0);
      PlayersRoom.newUser({id: 'someId1', name: 'test1'});
      PlayersRoom.newUser({id: 'someId2', name: 'test2'});
      assert.equal(PlayersRoom.getUsersOnline().length, 2);
      PlayersRoom.clearUsersOnline();
      assert.equal(PlayersRoom.getUsersOnline().length, 0);
    }));

    it('should get incoming invitations', inject(function (PlayersRoom) {
      assert.equal(typeof PlayersRoom.getInvitations, 'function');
      assert.equal(PlayersRoom.getInvitations().length, 0);
    }));

    it('should put incoming invitations', inject(function (PlayersRoom) {
      assert.equal(PlayersRoom.getInvitations().length, 0);
      assert.equal(typeof PlayersRoom.putInvitation, 'function');
      PlayersRoom.putInvitation({userId: "someId1", userName: "test1"});
      assert.equal(PlayersRoom.getInvitations().length, 1);
    }));

    it('should remove invitation from user', inject(function (PlayersRoom) {
      assert.equal(typeof PlayersRoom.removeInvitationFromUser, 'function');
      assert.equal(PlayersRoom.getInvitations().length, 0);
      PlayersRoom.putInvitation({userId: "someId1", userName: "test1"});
      assert.equal(PlayersRoom.getInvitations().length, 1);
      PlayersRoom.removeInvitationFromUser("someId1");
      assert.equal(PlayersRoom.getInvitations().length, 0);
    }));

    it('should clear invitations', inject(function (PlayersRoom) {
      assert.equal(PlayersRoom.getInvitations().length, 0);
      PlayersRoom.putInvitation({userId: "someId1", userName: "test1"});
      assert.equal(PlayersRoom.getInvitations().length, 1);
      PlayersRoom.clearInvitations();
      assert.equal(PlayersRoom.getInvitations().length, 0);
    }));

    describe('sendInvitation', function () {
      it('should change user status if success', inject(function (PlayersRoom, $httpBackend) {
        PlayersRoom.newUser({id: 'someId1', name: 'test1'});
        $httpBackend.expectGET(process.env.API_URL + '/api/game/invitation/send/someId1').
        respond(200, {});
        PlayersRoom.sendInvitation('someId1').then(function() {
          assert.equal(PlayersRoom.getUsersOnline()[0].status, 'pending');
        });
        $httpBackend.flush();
      }));
      
      it('shouldn`t change user status if request fail', inject(function (PlayersRoom, $httpBackend) {
        PlayersRoom.newUser({id: 'someId1', name: 'test1'});
        $httpBackend.expectGET(process.env.API_URL + '/api/game/invitation/send/someId1').
        respond(404, {});
        PlayersRoom.sendInvitation('someId1').then(function() {}, function() {
          assert.equal(PlayersRoom.getUsersOnline()[0].status, 'free');
        });
        $httpBackend.flush();
      }));
    });


  });
});
