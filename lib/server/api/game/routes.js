var express = require('express');
var router = express.Router();
var ctrlGame = require('./controllers.js');

// router.post('/newgame', ctrlGame.createNewGame); // just rename to acceptInvitation
router.get('/moves:id', ctrlGame.getAllMoves);
router.post('/checkmove', ctrlGame.validation);
router.get('/gameroom:id', ctrlGame.getGameRoom);

router.get('/invitation/send/:userId', ctrlGame.sendInvitation);
router.get('/invitation/accept/:userId', ctrlGame.acceptInvitation);

module.exports = router;
