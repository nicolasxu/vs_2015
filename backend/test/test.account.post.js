var assert = require('assert');
var target = "http://localhost:3000/account";
var should = require('should');
var rp = require('request-promise');

var helper = require('./TestUtilities');

describe('Test POST /account', function() {
  describe(' 2000 - Account successfully created ', function () {
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

	  after(function(done) {
      // remove user created
      helper.removeUser(email)
        .then(function(result){
          //console.log(result);
          done();
        });
	  });

	  beforeEach(function() {
	  });

	  afterEach(function() {
	  });

    it('2000 - Account successfully created', function (done) {

			rp(options)
		    .then(function (parsedBody) {
		     
      		// { code: 2000, message: 'Account successfully created' }
      		parsedBody.code.should.be.eql(2000);


		      done();
		    })
		    .catch(function (err) {
		        // POST failed...
		    });
    });
  });
  describe('4001  account already existed (activated) ', function () {
    this.timeout(1000); // set time out for this group
    var email = "payload2@payload2.com";
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

    before(function(done){
      // create user
      helper.addUser(email, password)
        .then(function(res){
          // set active to be true
          return helper.activeUser(email);
        })
        .then(function(res){
          
          done();
        });
    });
    after(function(done){
      // delete user
      helper.removeUser(email)
        .then(function(){
          done();
        })
    });
    it('4001  account already existed (activated)', function (done) {

      helper.addUser(email, password)
        .then(function(res){
         
          res.code.should.be.eql(4001);
          // { code: 4001, message: 'account already existed (activated)' }
          done();
        })
    });
  }); 
  describe('4002 email is invalid', function () {
    this.timeout(1000); // set time out for this group
    var email = "payload2payload2.com";
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
    it('4002 email is invalid', function (done) {
      rp(options)
        .then(function(parseBody){
          parseBody.code.should.be.eql(4002);
          done();
        });
    });
  });
  describe('4003 password does not meet min requirement', function () {
        this.timeout(1000); // set time out for this group
    var email = "payload3@payload3.com";
    var password = "1";
    var options = { 
      method: 'POST',
      uri: target,
      body: {
          email: email,
          password: password
      },
      json: true // Automatically stringifies the body to JSON
    };
    it('4003 password does not meet min requirement', function (done) {
      rp(options)
        .then(function(parseBody){
          
          parseBody.code.should.be.eql(4003);
          done();
        });
    });
  });
 
});