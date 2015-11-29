var SCHEMA_FRIEND = require(process.env.APP_SCHEMA_FRIEND);

module.exports = function(_request, _response) {
    SCHEMA_FRIEND.findOne({
            _id: _request.params.query
        })
        .then(function(friend) {
            console.log(friend);
            if (friend) {
                if (friend.requester.user.toString() === _request.user._id.toString() ||
                    friend.requestee.user.toString() === _request.user._id.toString()) {
                    if (friend.requester.user.toString() === _request.user._id.toString()) {
                        friend.requestee.accepted = false;
                        friend.requester.ignore = true;
                    } else {
                        friend.requester.accepted = false;
                        friend.requestee.ignore = true;
                    }
                    friend
                        .remove()
                        .then(function(result) {
                            _response
                                ._R
                                ._SUCCESS("Friend removed")
                                ._SEND();
                        })
                        .catch(function(err) {
                            _response
                                ._R
                                ._ERROR("Failed to remove friend")
                                ._STATUS(500)
                                ._SEND();
                            console.trace(err);
                        });
                } else {
                    _response
                        ._R
                        ._ERROR("Friend not found")
                        ._STATUS(404)
                        ._SEND();
                }
            } else {
                _response
                    ._R
                    ._ERROR("Friend not found")
                    ._STATUS(404)
                    ._SEND();
            }
        })
        .catch(function(err) {
            _response
                ._R
                ._ERROR("Failed to remove friend")
                ._STATUS(500)
                ._SEND();
            console.trace(err);
        });
};