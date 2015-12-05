var express = require('express');
var router = express.Router();
var path = require('path');

router.use('/', express.static(process.env.APP_CLIENT_FOLDER));
router.use('/about', express.static(process.env.APP_CLIENT_FOLDER));
router.use('/tryme', express.static(process.env.APP_CLIENT_FOLDER));

module.exports = router;