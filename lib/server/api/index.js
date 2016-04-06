var express = require('express');
var api = express();

api.get('/chess', function(req, res) {
  res.send({username: req.session.username});
});
app.get('/records', function(request, response) {
	var records = [
		{userName: 'Ivan', score: Math.floor(Math.random() * (100 - 10 + 1) + 10) },
		{userName: 'Petro', score: Math.floor(Math.random() * (100 - 10 + 1) + 10) },
		{userName: 'Foo', score: Math.floor(Math.random() * (100 - 10 + 1) + 10) },
		{userName: 'Bar', score: Math.floor(Math.random() * (100 - 10 + 1) + 10) },
	];
	response.send(records);
});

module.exports = api;