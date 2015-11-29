var SCHEMA_FRIEND = require(process.env.APP_SCHEMA_FRIEND),
    SCHEMA_USER = require(process.env.APP_SCHEMA_USER);
module.exports = function(_request, _response) {
    var friend_request_out = new SCHEMA_FRIEND({
        requester: {
            user: _request.user._id,
            accepted: false,
            ignore: false
        },
        requestee: {
            friend: _request.user._id,
            accepted: true,
            ignore: false
        }
    });
    SCHEMA_USER.findOne({
            _id: _request.params.query
        })
        .then(function(user) {
            if (user) {
                friend_request_out.requester.friend = user._id;
                friend_request_out.requestee.user = user._id;
                return friend_request_out.save()
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
                ._DATA("friend_request_out", friend_request_out)
                ._SUCCESS("Friend request sent!")
                ._SEND();
        })
        .catch(function(err) {
            if (err.code === 11000 || err.code === 11001) {
                //Lets look it up and check if this is a duplicate where the other user sent the request!
                SCHEMA_FRIEND.findOne({
                        uniquecombination: friend_request_out.uniquecombination
                    })
                    .then(function(friend_request) {
                        if (!friend_request) { //Friend wasn't found
                            _response
                                ._R
                                ._ERROR("Failed to send friend request!")
                                ._STATUS(500);
                            console.trace("Failed to find the request that was already in database");
                        } else if (friend_request.requestee.user.toString() === _request.user._id.toString() && //The request for friendship was already requested by the other user
                            friend_request.requestee.accepted && //The requester still wants to be friends
                            !friend_request.requester.accepted && //Friend request was not accepted already
                            !friend_request.requester.ignore) { //The requester does not ignore the user
                            friend_request.requester.accepted = true;
                            return friend_request.save();
                        } else {
                            _response
                                ._R
                                ._SUCCESS("Friend request sent!")
                                ._STATUS(400);
                        }
                    })
                    .then(function(result) {
                        var friend = undefined;
                        if (result) {
                            if (result.requester.user.toString() === _request.user._id) {
                                friend = {
                                    friend_request_id: result._id,
                                    _id: result.requester.user,
                                    created_at: result.created_at,
                                    updated_at: result.updated_at
                                };
                            } else {
                                friend = {
                                    friend_request_id: result._id,
                                    _id: result.requestee.user,
                                    created_at: result.created_at,
                                    updated_at: result.updated_at
                                };
                            }
                            _response
                                ._R
                                ._SUCCESS("Friend added!")
                                ._DATA("friend", friend);
                        }
                    })
                    .catch(function(err) {
                        _response
                            ._R
                            ._ERROR("Failed to send friend request!")
                            ._STATUS(500);
                        console.trace(err);
                    })
                    .finally(function() {
                        _response
                            ._R
                            ._SEND();
                    })
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