/*_ASSIGN_ RE*/
var SCHEMA_FRIEND = require(process.env.APP_SCHEMA_FRIEND),
    SOCKET = require(process.env.APP_SOCKET);

/**
 *
 * The API deletes the registered connection between two users that makes up a "friendship"
 * 
 * @url     - /api/closed/friends/:query
 * @method  - DELETE
 * 
 *      Finds user by ID, checks if the user found and the user deleting the connection,
 *      actually is connected, and then deletes the connection if that is the case
 *
 *      notifications: [See lib/express/response.js]
 *  
 *
 *  Error response
 *      notifications: [See lib/express/response.js]
 */


module.exports = function(_request, _response) {
    SCHEMA_FRIEND.findOne({
            _id: _request.params.query
        })
        .then(function(friend) {
            console.log(friend);
            if (friend) {
                if (friend.requester.user.toString() === _request.user._id.toString() ||
                    friend.requestee.user.toString() === _request.user._id.toString()) {
                    var receiver = _request.user._id.toString() === friend.requester.user.toString() ? friend.requester.friend : friend.requester.user;
                    friend
                        .remove()
                        .then(function(result) {
                            _response
                                ._R
                                ._SUCCESS("Friend removed")
                                ._SEND();
                            SOCKET.friend_reject(receiver, friend._id);
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