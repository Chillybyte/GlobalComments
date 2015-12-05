var SCHEMA_USER = require(process.env.APP_SCHEMA_USER),
    uuid = require("uuid");

module.exports = function(_request, _response, _next) {

    if (!_request.user.api.key) {
        _request.user.api.key = uuid.v1();
        _request.user.save()
            .then(function(result) {
                _response
                    ._R
                    ._DATA("user", result.toOWNER())
                    ._SEND();
            })
            .catch(function(err) {
                _response
                    ._R
                    ._ERROR("Failed to create API key, please try again later")
                    ._STATUS(500)
                    ._SEND();
                console.trace(err);
            });
    } else {
        _response
            ._R
            ._DATA("user", _request.user.toOWNER())
            ._SEND();
    }
};