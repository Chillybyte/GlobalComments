var SCHEMA_USER = require(process.env.APP_SCHEMA_USER);
module.exports = function(_request, _response) {
    SCHEMA_USER.findOne({
            _id: _request.params.user_id
        })
        .then(function(user) {
            if (user) {
                _response
                    ._R
                    ._DATA("user", user.toJSON())
                    ._SEND();
            } else {
                _response
                    ._R
                    ._ERROR("Friend does not exist")
                    ._STATUS(400)
                    ._SEND();
            }
        })
        .catch(function(err) {
            _response
                ._R
                ._ERROR("Failed to find friend")
                ._STATUS(500)
                ._SEND();
            console.trace(err);
        });
};