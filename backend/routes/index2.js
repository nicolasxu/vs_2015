var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
 
  console.log('Session ID: ', req.sessionID);
  if (req.session.counter) {
		req.session.counter = req.session.counter +1;
	} else {
		req.session.counter = 1;
	}
  res.render('index', { title: 'Express', 
  	counter: req.session.counter });

});

module.exports = router;
