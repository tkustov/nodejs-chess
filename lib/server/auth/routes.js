var express = require('express');
var router = express.Router();
var db = require('../db');
var ctrlUsers = require('./controllers')(db);

router.post('/login', ctrlUsers.authorization);
router.post('/register', ctrlUsers.registration);
router.post('/logout', ctrlUsers.logout);

module.exports = router;