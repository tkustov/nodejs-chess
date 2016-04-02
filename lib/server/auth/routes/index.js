var express = require('express');
var router = express.Router();
var ctrlUsers = require('../controllers/users');

router.post('/login', ctrlUsers.authorization);
router.post('/register', ctrlUsers.registration);
router.post('/logout', ctrlUsers.logout);

module.exports = router;