var express = require('express');
var router = express.Router();
var ctrlGame = require('./controllers.js');

router.get('/smth', ctrlGame.someMethod);


module.exports = router;
