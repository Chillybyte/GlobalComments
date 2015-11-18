var express = require('express');
var router = express.Router();


router.use("/", require(process.env.APP_LIB_EXPRESS_RESPONSE));

router.use('open/', require('./open'));
router.use("closed/", require(process.env.APP_LIB_EXPRESS_IS_AUTHENTICATED), require("./closed"));

module.exports = router;