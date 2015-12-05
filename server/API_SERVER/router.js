var express = require('express');
var router = express.Router();

router.use(require(process.env.APP_LIB_EXPRESS_RESPONSE));

router.use('/api', require('./api'));

module.exports = router;