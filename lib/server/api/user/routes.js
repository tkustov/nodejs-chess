var express = require('express');
var router = express.Router();
var ctrlUser = require('./controllers.js');

router.get('/name', ctrlUser.userName);
router.get('/room', ctrlUser.userRoom);

module.exports = router;
