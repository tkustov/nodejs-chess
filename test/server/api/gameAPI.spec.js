var assert = require("assert");
var request = require("request");
var baseUrl = "http://localhost:8081/api/game";

var checkMoveOptions = {
  url: baseUrl + "/checkmove",
  json: {gameId: "571f7919c12ccf6c11525dce", form: "a2", to: "a3"}
}

describe("Game API Module", function () {
  
  describe("'checkmove' route", function () {
    it("returns status code 200 (move is valid and was written in DB)", function(done){
      request.post(checkMoveOptions, function(err, res) {
        assert.equal(201, res.statusCode);
        done();
      });
    });
    
    it("returns status code 400 (empty req body)", function(done) {
      request.post(baseUrl + "/checkmove", function(err, res) {
        assert.equal(400, res.statusCode);
        done();
      });
    });
    
    it("returns 'gameId, form, to are required'(no gameId in req body)", function(done) {
      request.post({url: baseUrl + "/checkmove", json:{form: "a2", to: "a3"}}, function(err, res, body) {
        assert.equal("gameId, form, to are required", body.message);
        done();
      });
    });
  });
  
  describe("'moves' route", function () {
    it("returns status 200 (available to show moves)", function(done) {
      request.get(baseUrl + "/moves571f7919c12ccf6c11525dce", function (err, res) {
        assert.equal(200, res.statusCode);
        done();
      });
    });
    
    it("returns status 404 (wrong gameId in req body)", function (done) {
      request.get(baseUrl + "/moves5", function (err, res) {
        assert.equal(400, res.statusCode);
        done();
      });
    });
  });
  
  describe("'gameroom' route", function() {
    it("returns status code 200 (game room was found)", function (done) {
      request.get(baseUrl + "/gameroom571f7919c12ccf6c11525dce", function (err, res) {
        assert.equal(200, res.statusCode);
        done();
      });
    });
    
    it("returns status 400 (wrong gameId in req body)", function(done) {
      request.get(baseUrl + "/gameroom5", function(err, res) {
        assert.equal(400, res.statusCode);
        done();
      });
    });
  });
});