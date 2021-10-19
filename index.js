
var express = require('express');
var app = express();
app.get('\notes', function(req, res) {
	res.json({"key": "value"})
})
app.listen(3000);