var express = require('express');
var router = express.Router();
var cntrUsers = require('../controllers/users');
var checkAuth = require('../middleware/checkAuth');

router.get('/chess', checkAuth, function(req, res, next){
  res.send({username: req.session.user});
    // res.status(200).json({"username": "admin"});
});
//router.options('/login', function(req, res) {res.end()});
router.post('/login', cntrUsers.isAuthorized);
router.post('/register', cntrUsers.registerNewUser);
router.post('/logout', cntrUsers.logout);

module.exports = router;