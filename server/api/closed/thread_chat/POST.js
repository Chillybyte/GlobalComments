/*_ASSIGN_ ET*/
var SCHEMA_THREAD_CHAT = require(process.env.APP_SCHEMA_THREAD_CHAT),
    SCHEMA_MESSAGE = require(process.env.APP_SCHEMA_MESSAGE),
    SOCKET = require(process.env.APP_SOCKET);

/**
 *  Adds a message to a thread_chat and sends the newly created message to
 *  all related receivers via sockets.
 *
 *  @_request: The actual request by the client
 *      @_request.params.thread_id: <String>
 *      @_request.body.message: <String>
 *  @_response: The actual response to the client
 *
 *  Ex:
 *     POST /api/closed/thread_chat/<thread_id>
 *          {
 *              message: <String>
 *          }
 *
 *  Successful response:
 *      message: See schemas/message.js
 *      updated_at: <Date>
 *      notifications: [See lib/express/response.js]
 *
 *
 *  Error response:
 *      notifications: [See lib/express/response.js]
 */
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

                        SOCKET.new_chat(_request.user, thread.users, {
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