var express = require('express');
var router = express.Router();
var ctrlUser = require('./controllers.js');

// router.get('/name', ctrlUser.userName);
// router.get('/room', ctrlUser.userRoom);


router.get('/info', ctrlUser.userInfo);
router.put('/password', ctrlUser.changeUserPassword);
router.put('/email', ctrlUser.changeUserEmail);


module.exports = router;
