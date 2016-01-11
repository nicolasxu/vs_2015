var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var accountSchema = new Schema({
	email: String,
	password: String,
	created: Number,
	updated: Number,
	active: Boolean
});

module.exports = accountSchema;