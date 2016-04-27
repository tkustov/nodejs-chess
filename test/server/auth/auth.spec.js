var assert = require('assert');
var request = require('request');
var config = require('../../config');
var base_url = config.env.API_URL;
var mongoose = require('mongoose');

var loginOptions = {
  method: 'post',
  url: base_url + '/login',
  json: {username: 'test', password: 'test'}
};
var registrationOptions = {
  method: 'post',
  url: base_url + '/register',
  json: {username: 'test', password: 'test', email: 'test@test.me'}
};

  describe('Authorization Module', function() {
    before(function(done) {
      mongoose.connect('mongodb://127.0.0.1:27017/chessMEAN', function(){
        mongoose.connection.db.dropDatabase(function() {
          done();
        });
      });
    });

    describe('registration part', function() {
      it('returns status code 400 without req.body', function(done) {
        request.post(base_url + '/register', function(error, response, body) {
          assert.equal(400, response.statusCode);
          done();
        });
      });
      
      it('returns status message "all fields required" if there aren`t all necessary info', function(done) {
        request.post({url: base_url + '/register', json: {username: 'test'}}, function(error, response, body) {
          assert.equal("all fields required", body.message);
          done();
        });
      });
      
      it('creates new users', function(done) {
        request(registrationOptions, function(error, response, body) {
          assert.equal(201, response.statusCode);
          done();
        });
      });
    });
    
    describe('login part', function() {
      it('returns status code 200', function(done) {
        request(loginOptions, function(error, response, body) {
          assert.equal(200, response.statusCode);
          done();
        });
      });
      
      it('returns message "authorized"', function(done) {
        request(loginOptions, function(error, response, body) {
          assert.equal('authorized', body.message);
          done();
        });
      });
      
      it('returns status code 400 without req.body', function(done) {
        request.post(base_url + '/login', function(error, response, body) {
          assert.equal(400, response.statusCode);
          done();
        });
      });
      
      it('returns status code 401 if password is incorrect', function(done) {
        request.post({url:base_url + '/login', json:{username: 'test', password: 'tester'}}, function(error, response, body) {
          assert.equal(401, response.statusCode);
          done();
        });
      });
    });
    
    describe('logout part', function() {
      it('returns status code 200', function(done) {
        request.post(base_url + '/logout', function(error, response, body) {
          assert.equal(200, response.statusCode);
          done();
        });
      });
    });
  })