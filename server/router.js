/*_ASSIGN_ ET*/
var express = require('express');
var router = express.Router();

router.use(require(process.env.APP_LIB_EXPRESS_RESPONSE));

router.use('/', express.static(process.env.APP_CLIENT_FOLDER));
router.use('/about', express.static(process.env.APP_CLIENT_FOLDER));
router.use('/tryme', express.static(process.env.APP_CLIENT_FOLDER));

router.use('/api', require('./api'));

module.exports = router;