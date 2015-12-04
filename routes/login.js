var express = require('express');
var router = express.Router();

var getLogin = require('./login/getLogin.js');
var postLogin = require('./login/postLogin.js');

router.get('/', getLogin);
router.post('/', postLogin);

module.exports = router;
