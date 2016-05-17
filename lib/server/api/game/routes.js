var express = require('express');
var router = express.Router();
var ctrlGame = require('./controllers.js');

// router.post('/newgame', ctrlGame.createNewGame); // just rename to acceptInvitation
router.get('/gameinfo/:id', ctrlGame.getGameInfo);
router.post('/checkmove', ctrlGame.validation);
router.get('/gameroom:id', ctrlGame.getGameRoom);
router.get('/id', ctrlGame.getLastGameId);
router.get('/messages/:gameId', ctrlGame.getMessages);

router.get('/invitation/send/:userId', ctrlGame.sendInvitation);
router.get('/invitation/cancel/:userId', ctrlGame.cancelInvitation);
router.get('/invitation/accept/:userId', ctrlGame.acceptInvitation);
router.get('/invitation/refuse/:userId', ctrlGame.refuseInvitation);

module.exports = router;
