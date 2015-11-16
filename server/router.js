var express = require('express');
var router = express.Router();
var path = require('path');

router.use('/', express.static(path.join(__dirname, '../web/dist/')));
router.use('about.html', express.static(path.join(__dirname, '../web/dist/')));
router.use('tryme.html', express.static(path.join(__dirname, '../web/dist/')));

router.use('api/', require('./api'));

module.exports = router;