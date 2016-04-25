var express = require('express');
var router = express.Router();
var ctrlUser = require('./controllers.js');


router.get('/users-online', ctrlUser.usersOnline);
router.get('/info', ctrlUser.userInfo);
router.put('/password', ctrlUser.changeUserPassword);
router.put('/email', ctrlUser.changeUserEmail);


module.exports = router;
