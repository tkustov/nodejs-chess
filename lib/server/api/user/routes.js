var express = require('express');
var router = express.Router();
var ctrlUser = require('./controllers.js');

router.get('/name', ctrlUser.userName);


module.exports = router;
