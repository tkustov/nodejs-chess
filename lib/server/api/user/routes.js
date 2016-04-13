var express = require('express');
var router = express.Router();
var ctrlUser = require('./controller.js');

router.post('/', ctrlUser.method);