var express = require('express');
var router = express.Router();
var path = require('path');

router.use(require(process.env.APP_LIB_EXPRESS_RESPONSE));

router.use('/', express.static(process.env.APP_CLIENT_FOLDER));
router.use('/about', express.static(process.env.APP_CLIENT_FOLDER));
router.use('/tryme', express.static(process.env.APP_CLIENT_FOLDER));

router.use('/api', require('./api'));

router.route("/api/sign_out")
    .get(function(_request, _response) {
        _request.logout();
        _response
            ._R
            ._SEND();
    });
module.exports = router;