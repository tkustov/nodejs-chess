var express = require('express');
var router = express.Router();
var ctrlGame = require('./controller.js');

router.post('/', ctrlGame.method);