var assert = require('assert');
var target = "http://localhost:3000/account";
var should = require('should');
var rp = require('request-promise');

var helper = require('./TestUtilities');

describe('Test POST /account', function() {
  describe('4001 account already existed (activated)', function () {
  	this.timeout(1000); // set time out for this group

  	var email = "payload@payload.com";
  	var password = "123456";
  	var options = {
	    method: 'POST',
	    uri: target,
	    body: {
	        email: email,
	        password: password
	    },
	    json: true // Automatically stringifies the body to JSON
		};

  	before(function(done) {

  		helper.addUser(email, password)
  			.then(function(result){

  				done();
  			});

	  });

	  after(function() {
	    // runs after all tests in this block
	    // It doesn't matter where it is defined, as long as it is in the describe
	    // console.log("after all test in this describe()");

	  });

	  beforeEach(function() {
	    // runs before each test in this block
	   	// console.log("before each test in this describe()");

	  });

	  afterEach(function() {
	    // runs after each test in this block
	    // console.log("after each test in this describe()");
	  });

    it('2000 - Account successfully created', function (done) {

			rp(options)
		    .then(function (parsedBody) {
		      // POST succeeded...
      		// { code: 2000, message: 'Account successfully created' }
      		parsedBody.code.should.be.eql(2000);


		      done();
		    })
		    .catch(function (err) {
		        // POST failed...
		    });


    });
  });

  describe('4002 email is invalid', function () {
    it('should return -1 when the value is not present', function () {
      // assert.equal(-1, [1,2,3].indexOf(5));
      // assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
  describe('4003 password does not meet min requirement', function () {
    it('should return -1 when the value is not present', function () {
      // assert.equal(-1, [1,2,3].indexOf(5));
      // assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
  describe('4001  account already existed (activated) ', function () {
    it('should return -1 when the value is not present', function () {
      // assert.equal(-1, [1,2,3].indexOf(5));
      // assert.equal(-1, [1,2,3].indexOf(0));
    });
  });  
});