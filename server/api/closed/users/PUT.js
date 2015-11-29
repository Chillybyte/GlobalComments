var SCHEMA_USER = require(process.env.APP_SCHEMA_USER);
module.exports = function(_request, _response) {
    if (_request.params.user_id.toString() !== _request.user._id.toString()) {
        _response
            ._R
            ._ERROR("'" + _request.params.user_id + "' is not your user id!")
            ._STATUS(403)
            ._SEND();
        return;
    }
    SCHEMA_USER.findOne({
            _id: _request.params.user_id
        })
        .then(function(result) {
            if (!result) {
                _response
                    ._R
                    ._ERROR("No user by id: '" + _request.params.user_id + "'")
                    ._SEND();
            } else {
                console.log(result);
                result.first_name = _request.body.first_name || result.first_name;
                result.last_name = _request.body.last_name || result.last_name;
                result.username = _request.body.username || result.username;
                return result.save();
            }
            console.log(result);
        })
        .then(function(result) {
            _response
                ._R
                ._SUCCESS("Your changes were saved")
                ._DATA("user", result.toJSON())
                ._SEND();
        })
        .catch(function(err) {
            _response
                ._R
                ._ERROR("Unknown error")
                ._STATUS(500)
                ._SEND();
            console.trace(err);
        });
};