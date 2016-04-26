var express = require('express');
var router = express.Router();
var ctrlUser = require('./controllers.js');

router.get('/info', ctrlUser.userInfo);
router.put('/password', ctrlUser.changeUserPassword);
router.put('/email', ctrlUser.changeUserEmail);
router.get('/users-online', ctrlUser.usersOnline);

module.exports = router;
