
var AccountModel = require('../models').Account;
var Promise = require('bluebird');

// result of this module
module.exports = mountRoutes;


function mountRoutes(router) {
	// router is express.Router()
	

	router.post('/account', function(req, res, next){
		
		var message = {
			accountExist: {code: 4001, message: "account already existed (activated)"},
			invalidEmail: {code: 4002, message: "email is invalid"},
			weakPassword: {code: 4003, message: "password does not meet min requirement"},
			success: {code: 2000, message: "Account successfully created"}
		};

		
		var newAccount = new AccountModel({email:req.body.email, password: req.body.password});

		// 1. validate email
		if(!newAccount.isEmailValid()) {
			res.status(200).json(message.invalidEmail);
			return;
		}
		// 2. validate password
		if(!newAccount.isPasswordValid()) {
			res.status(200).json(message.weakPassword);
			return;
		}
		// 3. validate Is new account
		newAccount.isRegisteredAlready()
			.then(function(isRegistered){
				if(isRegistered) {
					// already in db
					// set http response code in http header
					
					res.status(200).json(message.accountExist);
					return Promise.reject("this should exit the then chain");
				}
			})
			.then(function(){
				// 4. create account
				return newAccount.saveAccount();
			})
			.then(function(data){
				// 5. display success message
				res.status(201).json(message.success);
			});
			/*  no need to catch error here. let it catch by next mid ware
			
			 .catch(function(reason){
					//console.log(reason);
					// all else 500 error is catched in app.js in the middle ware
				});
			*/ 

	});

	router.delete('/user111', function(req, res, next){

	})
}


