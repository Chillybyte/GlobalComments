var express = require('express');
var router = express.Router();
var path = require('path');

router.use(require(process.env.APP_LIB_EXPRESS_RESPONSE));

router.use('/', express.static(process.env.APP_CLIENT_FOLDER));
router.use('about.html', express.static(process.env.APP_CLIENT_FOLDER));
router.use('tryme.html', express.static(process.env.APP_CLIENT_FOLDER));

router.use('api/', require('./api'));

module.exports = router;