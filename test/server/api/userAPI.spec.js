var assert = require("assert");
var request = require("request");
var baseUrl = "http://localhost:8081/api/user";
var httpMocks = require('node-mocks-http');
var user = require('../../../lib/server/models/users');
var mockDb = { user: user };
var controller = require('../../../lib/server/api/user/controllers');

describe('change User Password', function() {
  
    /*it('handles requests without credentials', function(done) {
      var res = httpMocks.createResponse();
      var req = httpMocks.createRequest({
        body: { _id: "1111111111111111111111111", username:'test', currentPassword: '123', newPassword:'456' }, session: {}});
      controller.changeUserPassword(req, res);
      var data = JSON.parse(res._getData());
      
      assert.equal(400, res.statusCode);
      assert.equal('Incorrect password', data.message);
      done();
    });
    */
    /*it('handles requests without credentials', function(done) {
      var res = httpMocks.createResponse();
      var req = httpMocks.createRequest({
        body: { _id: "1111111111111111111111111", username:'test', currentPassword: '123', newPassword:'456' }, session: {}});
      controller.changeUserPassword(req, res);
      //var data1 = JSON.parse(res._getData());
      controller.setPassword(req, res);
      var data = JSON.parse(res._getData());
      
      assert.equal(400, res.statusCode);
      assert.equal('Server error', data.message);
      done();
    });*/
    
    it('handles requests without credentials', function(user, done) {
      var res = httpMocks.createResponse();
      var req = httpMocks.createRequest({
        body: { _id: "1111111111111111111111111", username:'test', currentPassword: '123', newPassword:'456' }, session: {_id: "1111111111111111111111111"}});
      controller.changeUserPassword(req, res);
      //mockDb.uservar data1 = JSON.parse(res._getData());
      user.checkPassword(req, res);
      user.setPassword(req, res);
      var data = JSON.parse(res._getData());
      
      assert.equal(200, res.statusCode);
      assert.equal('Password changed', data.message);
      done();
    });
  });