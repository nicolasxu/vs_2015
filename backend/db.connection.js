var mongoose = require('mongoose');

module.exports = dbConnectionFunc;

function dbConnectionFunc() {
	// connect to local mongoDB
	mongoose.connect('mongodb://localhost/vitaSpider');
}


