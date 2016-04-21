var express = require('express');
var router = express.Router();
var ctrlGame = require('./controllers.js');

router.post('/newgame', ctrlGame.createNewGame);
router.post('/writemove/', ctrlGame.writeMove);
router.get('/moves:id', ctrlGame.getAllMoves);

module.exports = router;
