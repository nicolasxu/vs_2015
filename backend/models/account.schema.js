var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Promise = require('bluebird');
var bcrypt = require('bcryptjs');

var accountSchema = new Schema({
	email: String,
	password: String,
	created: String,
	updated: String,
	active: Boolean
});
 
accountSchema.methods.isRegisteredAlready = function () {
	// check if this document email is duplicated in account collection.
	//   1. not duplicated if {active: false}. 
	var modelObj = this.model('Account');
	var email = this.email;
	var registered = false;
	
	var promiseObj = new Promise(function(resolveFunc, rejectFunc){
		modelObj.find({email: email, active: true})
			.then(function(docs, err){
				if(err) {
					rejectFunc(err);
				} else {
					
					if(docs.length > 0) {
						registered = true;
					} else {
						registered = false;
					}
						resolveFunc(registered);
				}
		});
	});

	return promiseObj;
}

accountSchema.methods.isEmailValid = function () {
	
	if( /^\S+@\S+\.\S+$/.test(this.email)) {
		return true;
	} else {
		return false; 
	}	
}

accountSchema.methods.isPasswordValid = function () {
	if(/.{6}/.test(this.password)) {
		return true;
	} else {
		return false; 
	}
}

accountSchema.methods.saveAccount = function () {
	var model = this; // Model constructors compiled from Schema.

	var email = this.email;
	var password = this.password;
	var AccountModel = this.model("Account");

	var promise = new Promise(function(resolve, reject){
		bcrypt.hash(password, 8, function(err, hash) {
			if(err) {
				reject(err);
			} else {
				resolve(hash);
			}
		});
	}); // end of promise

	return promise.then(function(hash) {
			
			var saveObj = {email: model.email, 
										password: hash, 
										created: new Date().getTime(), 
										updated: new Date().getTime(),
										active: false};
			var upsirtProm = new Promise(function(resolve, reject){
						// find my email and replace this doc if found, or create new
					AccountModel.findOneAndUpdate({email: model.email}, 
						saveObj, {upsert: true}, function(err, result){
							if(err) {
								reject(err);
							} else {
								resolve(result);
							}
						});
			});
			return upsirtProm;

		}, function(err){
			return err;
		});
}


module.exports = accountSchema;