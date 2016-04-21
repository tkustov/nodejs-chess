var express = require('express');
var router = express.Router();
var ctrlGame = require('./controllers.js');

router.get('/smth', ctrlGame.someMethod);
//router.post('/writegameid', ctrlGame.writeGameId);
router.post('/newgame', ctrlGame.createNewGame);
router.post('/writemove/', ctrlGame.writeMove);

module.exports = router;
