var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var mongoDbUrl = "mongodb://localhost/vitaSpider";
var Promise = require("bluebird");
var assert = require('assert');
var accountCollectionName = "accounts"; // it is Account as Mongoose Model
var rp = require('request-promise');
var target = "http://localhost:3000/account";

function removeUser(email) {
	var promise = new Promise( function(resolve, reject) {
		MongoClient.connect(mongoDbUrl, function(err, db) {
		  assert.equal(null, err);
		  db.collection(accountCollectionName)
		  	.deleteMany({email: email}, 
		  		function(err, results){
		  			if(err) {
		  				reject(err);
		  			} else {
		  				resolve(results);
		  			}
		  		});
		});
	});
	return promise;
}

function addUser(email, password) {
	var options = {
    method: 'POST',
    uri: target,
    body: {
        email: email,
        password: password
    },
    json: true // Automatically stringifies the body to JSON
	};
	return rp(options);
}

module.exports = {
	addUser   : addUser,
	removeUser: removeUser
}