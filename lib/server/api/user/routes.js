var express = require('express');
var router = express.Router();
var ctrlUser = require('./controllers.js');

router.get('/name', ctrlUser.userName);
router.get('/info', ctrlUser.userInfo);
router.get('/users-online', ctrlUser.usersOnline);

module.exports = router;
