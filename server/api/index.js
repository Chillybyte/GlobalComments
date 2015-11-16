var express = require('express');
var router = express.Router();

router.use('open/', require('./open'))

module.exports = router;