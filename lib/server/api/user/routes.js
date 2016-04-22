var express = require('express');
var router = express.Router();
var ctrlUser = require('./controllers.js');


router.get('/users-online', ctrlUser.usersOnline);
router.get('/room', ctrlUser.userRoom);
router.get('/info', ctrlUser.userInfo);


module.exports = router;
