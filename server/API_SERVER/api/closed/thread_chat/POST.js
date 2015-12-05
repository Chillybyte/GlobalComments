var SCHEMA_THREAD_CHAT = require(process.env.APP_SCHEMA_THREAD_CHAT),
    SCHEMA_MESSAGE = require(process.env.APP_SCHEMA_MESSAGE);

module.exports = function(_request, _response) {
    console.log(_request);
    SCHEMA_THREAD_CHAT.findOne({
            $and: [{
                thread_id: _request.params.thread_id
            }, {
                users: _request.user._id
            }]
        })
        .then(function(thread) {
            if (thread) { //Found thread
                console.log(thread);
                var message = new SCHEMA_MESSAGE({
                    user: _request.user._id,
                    content: _request.body.message
                });
                thread.messages.push(message);
                thread.save()
                    .then(function(thread) {
                        console.log(thread);
                        _response
                            ._R
                            ._DATA("message", message)
                            ._DATA("updated_at", thread.updated_at)
                            ._SUCCESS("Message sent")
                            ._SEND();
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
    console.log(_request.body);
    console.log(_request.params);
};