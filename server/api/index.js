var express = require('express');
var router = express.Router();

router.use('/open', require('./open'));
router.use("/closed", require(process.env.APP_LIB_EXPRESS_IS_AUTHENTICATED), require("./closed"));

router.route("/sign_out")
    .get(function(_request, _response) {
        _request.logout();
        _response
            ._R
            ._SEND();
    });
router.use("*", function(_request, _response) {
    _response
        ._R
        ._ERROR("'" + _request.baseUrl + "' is an invalid API path")
        ._SEND();
});

module.exports = router;