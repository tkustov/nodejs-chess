var assert = require('assert');
var httpMocks = require('node-mocks-http');

var user = require('../../../lib/server/models/users');
var mockDb = { user: user };
var controller = require('../../../lib/server/auth/controllers')(mockDb);

describe('Auth Controller', function() {
  describe('authorization', function() {
  
    it('handles requests without credentials', function(done) {
      var res = httpMocks.createResponse();
      var req = httpMocks.createRequest();
      controller.authorization(req, res);
      var data = JSON.parse(res._getData());
      
      assert.equal(400, res.statusCode);
      assert.equal('all fields required', data.message);
      done();
    });
    
    it('handles errors accurately', function(done) {
      mockDb.user.authorization = function(username, password, callback) {
        callback(new Error('Server error'))};
      var res = httpMocks.createResponse();
      var req = httpMocks.createRequest({
        body: {username: 'Billy', password: 'pass' }});
      controller.authorization(req, res);
      var data = JSON.parse(res._getData());
      
      assert.equal(401, res.statusCode);
      assert.equal('Server error', data.message);
      done();
    });
    
    it('handles proper requests', function(done) {
      mockDb.user.authorization = function(username, email, callback) {
        callback(null, user)};
      var res = httpMocks.createResponse();
      var req = httpMocks.createRequest({
        body: { username: 'Billy', password: 'pass' }, session: {}});
      controller.authorization(req, res);
      var data = JSON.parse(res._getData());
      
      assert.equal(200, res.statusCode);
      assert.equal('authorized', data.message);
      done();
      
    });
  });
  
  describe('registration', function() {
    it('handles requests without credentials', function(done) {
      var res = httpMocks.createResponse();
      var req = httpMocks.createRequest();
      controller.registration(req, res);
      var data = JSON.parse(res._getData());
      
      assert.equal(400, res.statusCode);
      assert.equal('all fields required', data.message);
      done();
    });
    
    it('handles errors accurately', function(done) {
      mockDb.user.register = function(username, email, password, callback) {
        callback(new Error())};
      var res = httpMocks.createResponse();
      var req = httpMocks.createRequest({
        body: {username: 'Billy', email:'test@test.exp', password: 'pass' }});
      controller.registration(req, res);
      var data = JSON.parse(res._getData());
      
      assert.equal(400, res.statusCode);
      assert.equal('User with this credentials already exists', data.message);
      done();
    });
    
    it('handles proper requests', function(done) {
      mockDb.user.register = function(username, email, password, callback) {
        callback(null,  user)};
      var res = httpMocks.createResponse();
      var req = httpMocks.createRequest({
        body: { username: 'Billy', email:'test@test.exp', password: 'pass' }, session: {}});
      controller.registration(req, res);
      var data = JSON.parse(res._getData());
      
      assert.equal(201, res.statusCode);
      assert.equal('User registred', data.message);
      done();
    });
  });
  
});