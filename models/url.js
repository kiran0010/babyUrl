var mongoose = require('mongoose');
var shortid = require('shortid');

var UrlSchema = new mongoose.Schema({
	originalUrl: String,
	shortUrl: {
		type: String,
		unique: true, 
	},
})

module.exports = mongoose.model("Url",UrlSchema)
