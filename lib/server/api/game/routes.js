var express = require('express');
var router = express.Router();
var ctrlGame = require('./controllers.js');

router.post('/newgame', ctrlGame.createNewGame);
router.get('/moves:id', ctrlGame.getAllMoves);
router.post('/checkmove', ctrlGame.validation);
router.get('/gameroom:id', ctrlGame.getGameRoom);

module.exports = router;
