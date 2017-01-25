var express = require('express');
var router = express.Router();
var Url = require('../models/url');
var shortid = require('shortid');



/* GET home page. */
router.get('/', function (req, res, next){
  res.render('index');
});

router.post('/shortener',function (req,res,next){
	// var data = req.body;	
	//res.json(data);
	// console.log(data);
	// var url = new Url(data);
	// var surl = shortid.characters('data');
	var sid = shortid.generate();
	// console.log(sid);
	var data1 = {'originalUrl': req.body.originalUrl, 'shortUrl': sid};
	// console.log(data1)
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
  	return res.render('list',{url:url})
  });
});

module.exports = router;
