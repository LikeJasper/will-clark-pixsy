var express = require('express');
var router = express.Router();

var getLogin = require('./login/getLogin.js');
var postLogin = require('./login/postLogin.js');

router.get('/', getLogin, function() {});
router.post('/', postLogin, function() {});

module.exports = router;
