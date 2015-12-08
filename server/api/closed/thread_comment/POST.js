/*_ASSIGN_ MSN*/
var SCHEMA_THREAD_COMMENT = require(process.env.APP_SCHEMA_THREAD_COMMENT),
    SCHEMA_MESSAGE = require(process.env.APP_SCHEMA_MESSAGE),
    SOCKET = require(process.env.APP_SOCKET);

module.exports = function(_request, _response) {
    if (!_request.params.reference) {
        _response
            ._R
            ._ERROR("Reference is missing")
            ._SEND();
    } else if (!_request.body.message) {
        _response
            ._R
            ._ERROR("Message cannot be empty!")
            ._SEND();
    } else {
        var reference = new Buffer(_request.params.reference).toString("base64");
        var message = new SCHEMA_MESSAGE({
            user: _request.user._id,
            content: _request.body.message
        });
        SCHEMA_THREAD_COMMENT.findOne({
                reference: reference
            })
            .then(function(result) {
                if (!result) {
                    _response
                        ._R
                        ._ERROR("Failed to make a comment, please try again later")
                        ._SEND();
                } else {
                    var l = result.users.length;
                    var found = false;
                    var socket_receivers = [];
                    for (var i = 0; i < l; i++) {
                        console.log(result.users[i] + " === " + _request.user._id + (result.users[i].toString() === _request.user._id.toString()));
                        if (result.users[i].toString() === _request.user._id.toString()) {
                            found = true;
                        } else {
                            socket_receivers.push(result.users[i]);
                        }
                    }
                    if (!found) {
                        result.users.push(_request.user._id);
                    }
                    result.messages.push(message);
                    console.log(result);
                    result.save()
                        .then(function(result) {
                            _response
                                ._R
                                ._DATA("message", message)
                                ._SEND();
                            SOCKET.new_comment(socket_receivers, {
                                uri: result.uri,
                                message: message
                            });
                        })
                        .catch(function(err) {
                            console.trace(err);
                            _response
                                ._R
                                ._ERROR("Unknown error")
                                ._SEND();
                        });
                }
            })
            .catch(function(err) {
                console.trace(err);
                _response
                    ._R
                    ._ERROR("Unknown error")
                    ._SEND();
            });
    }
};