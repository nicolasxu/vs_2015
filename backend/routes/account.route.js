
var AccountModel = require('../models').Account;

// result of this module
module.exports = mountRoutes;


function mountRoutes(router) {
	// router is express.Router()
	

	router.post('/account', function(req, res, next){
		res.end("/account route reached");
	});

	router.delete('/user111', function(req, res, next){

	})
}


