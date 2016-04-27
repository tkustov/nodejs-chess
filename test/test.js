var request = require("request"),
    assert = require('assert'),
    angular = require('angular'),
    require('angular-mocks'),
    require('...../auth');
    //base_url = "http://localhost:8081/";

describe('auth module', function() {
	beforeEach(angular.mock.module('chessauth'));
	describe('auth factory', function() {
		it('should have method login', inject(function(auth, $httpBackend) {
			assert.equal(typeof auth.login, 'function');
		}));
	})
})

/*describe("Hello World Test", function(){
=======
    base_url = "http://localhost:8081/";

describe("Hello World Test", function(){
>>>>>>> 2267c0428c1b80f18d191ae5f895ea07d4f2bcd2
	describe("GET /", function() {
		it("returns status code 200", function(done) {
			request.get(base_url, function(error, response, body) {
				assert.equal(200, response.statusCode);
				done();
      		});
    	});
    	it("returns Hello World", function(done) {
      		request.get(base_url, function(error, response, body) {
	        //expect(body).toBe("Hello World");
	        assert.equal("Hello World", body);
	        helloWorld.closeServer();
	        done();
      		});
    	});
  	});
<<<<<<< HEAD
});*/
