var express = require('express');
var router = express.Router();
var cntrUsers = require('../controllers/users');
var checkAuth = require('../middleware/checkAuth');

router.get('/chess', checkAuth, function(req, res, next){
	res.send({username: req.session.user});
});
router.post('/login', cntrUsers.isAuthorized);
router.post('/register', cntrUsers.registerNewUser);
router.post('/logout', cntrUsers.logout);

module.exports = router;