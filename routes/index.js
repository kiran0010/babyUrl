var express = require('express');
var router = express.Router();
var shortid = require('shortid');
var cvu = require('check-valid-url');
var Url = require('../models/url');

// var isRedirect = require('is-redirect');


/* GET home page. */
router.get('/', function (req, res, next){
  res.render('index');
});



var checkUrl = function (req, res, next){
	if (cvu.isUrl(req.body.originalUrl)){
	  next();
	}
	else {
	console.log('Not a Url');
	return res.json({error: true, result: 'plz enter a valid url'});
	}	
}


router.post('/urls', checkUrl, function (req,res,next){
	// var data = req.body;	
	//res.json(data);
	// console.log(data);
	// var url = new Url(data);
	// var surl = shortid.characters('data');
	var sid = shortid.generate();
	console.log(sid);
	var data1 = {'originalUrl': req.body.originalUrl, 'shortUrl': sid};
	console.log(data1)
	var url = new Url(data1);
	url.save(function (err,result){
		if(err){
			return res.json({error: true, reason:err});
		}
		return res.json({error: false, result: url.shortUrl});
	}); 
});

router.get('/:surl', function (req, res, next) {
  Url.findOne({shortUrl : req.params.surl})
  .exec(function (err,url){
  	// return res.render('list',{url:url})
  	console.log(url);
  	if(err || url === null){
  			return res.send('error');
  		} else {
  	// console.log(url.originalUrl);
  	var match = url.originalUrl.match(/^https:\/\/|http:\/\//)
  	console.log(match)
  	if (match === null) {
  		// console.log('http://'+url.originalUrl);
  		res.redirect('http://'+url.originalUrl);
  	} else {
  		res.redirect(url.originalUrl);
  	}
  }
  	// res.redirect(url.originalUrl);
  });
});

module.exports = router;
