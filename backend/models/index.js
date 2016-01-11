var mongoose = require('mongoose');
var accountSchema = require('./account.schema');

// the logic of mongoose is:
//   1. use new Schema({}) to create a schema
//   2. use mongoose.model('ModelName', schema) to create Model
//   3. use new Model to create object to save, update data


var Models = {
	Account: mongoose.model('Account', accountSchema)
	//Company: mongoose.model('Company', 'TODO')
};
module.exports = Models;