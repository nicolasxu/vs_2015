var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Promise = require('bluebird');

var accountSchema = new Schema({
	email: String,
	password: String,
	created: Number,
	updated: Number,
	active: Boolean
});

accountSchema.methods.isDuplicated = function () {
	// check if this document email is duplicated in account collection.
	//   1. not duplicated if {active: false}. 
	var modelObj = this.model('Account');
	var email = this.email;
	var promiseObj = new Promise(function(resolveFunc, rejectFunc){
		modelObj.find({email: email, active: true}).then(function(docs, err){
			if(err) {
				return rejectFunc(err);
			} else {
			
				return resolveFunc(docs);
			}

		});
	});

	return promiseObj;
}

module.exports = accountSchema;