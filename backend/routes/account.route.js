
var AccountModel = require('../models').Account;

// result of this module
module.exports = mountRoutes;


function mountRoutes(router) {
	// router is express.Router()
	

	router.post('/account', function(req, res, next){
		// var pppAccount = new AccountModel({email:"ppp@ppp.com", active: true});
		// pppAccount.save();
		var newAccount = new AccountModel({email:'ppp@ppp.com', password:'123456'});
		newAccount.isDuplicated()
			.then(function(results){
				console.log(results);
			})
			.then(function(){
				res.end("/account route reached");
			});
		

	});

	router.delete('/user111', function(req, res, next){

	})
}


