var SCHEMA_THREAD_CHAT = require(process.env.APP_SCHEMA_THREAD_CHAT),
    SCHEMA_MESSAGE = require(process.env.APP_SCHEMA_MESSAGE),
    SOCKET = require(process.env.APP_SOCKET);

module.exports = function(_request, _response) {
    SCHEMA_THREAD_CHAT.findOne({
            $and: [{
                thread_id: _request.params.thread_id
            }, {
                users: _request.user._id
            }]
        })
        .then(function(thread) {
            if (thread) { //Found thread
                var message = new SCHEMA_MESSAGE({
                    user: _request.user._id,
                    content: _request.body.message
                });
                thread.messages.push(message);
                thread.save()
                    .then(function(thread) {
                        _response
                            ._R
                            ._DATA("message", message)
                            ._DATA("updated_at", thread.updated_at)
                            ._SUCCESS("Message sent")
                            ._SEND();

                        var l = thread.users.length;
                        for (var i = 0; i < l; i++) {
                            if (thread.users[i].toString() === _request.user._id.toString())
                                thread.users.splice(i, 1);
                        };
                        SOCKET.new_chat(thread.users, {
                            users: thread.users,
                            message: message
                        });
                    })
                    .catch(function(err) {
                        _response
                            ._R
                            ._ERROR("Failed to send message, please try again later")
                            ._STATUS(500)
                            ._SEND();
                        console.trace(err);
                    });
            } else { //Thread wasn't found
                _response
                    ._R
                    ._ERROR("Failed to send message, please try again later")
                    ._STATUS(500)
                    ._SEND();
            }
        })
        .catch(function(err) {
            _response
                ._R
                ._ERROR("Failed to send message, please try again later")
                ._STATUS(500)
                ._SEND();
            console.trace(err);
        });
};