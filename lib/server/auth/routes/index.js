var express = require('express');
var router = express.Router();
var cntrUsers = require('../controllers/users');

router.post('/login', cntrUsers.isAuthorized);
router.post('/register', cntrUsers.registerNewUser);
router.post('/logout', cntrUsers.logout);

module.exports = router;