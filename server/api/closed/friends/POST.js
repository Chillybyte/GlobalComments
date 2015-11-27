var SCHEMA_FRIEND_REQUEST = require(process.env.APP_SCHEMA_FRIEND_REQUEST),
    SCHEMA_USER = require(process.env.APP_SCHEMA_USER);
module.exports = function(_request, _response) {
    var friend_request = new SCHEMA_FRIEND_REQUEST({
        user_user_requested: _request.user._id.toString() + _request.params.query.toString(),
        user: _request.user._id,
        user_requested: _request.params.query
    });
    SCHEMA_USER.findOne({
            _id: _request.params.query
        })
        .then(function(friend) {
            if (friend) {
                return friend_request.save()
            } else {
                _response
                    ._R
                    ._ERROR("User does not exist")
                    ._STATUS(400)
                    ._SEND();
            }
        })
        .then(function(result) {
        	console.log(result);
            _response
                ._R
                ._DATA("friend_request", friend_request)
                ._SUCCESS("Friend request sent!")
                ._SEND();
        })
        .catch(function(err) {
            if (err.code === 11000 || err.code === 11001) {
                _response
                    ._R
                    ._INFO("Friend request already sent")
                    ._STATUS(400)
                    ._SEND();
            } else {
                _response
                    ._R
                    ._ERROR("Failed to send friend request!")
                    ._STATUS(500)
                    ._SEND();
                console.trace(err);
            }
        });
};