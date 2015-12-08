/*_ASSIGN_ ET*/
var SCHEMA_THREAD_CHAT = require(process.env.APP_SCHEMA_THREAD_CHAT);

/**
 *  Collects all messages related to a thread
 *
 *  @_request: The actual request by the client
 *      @_request.params.thread_id: <String>
 *  @_response: The actual response to the client
 *
 *  Ex:
 *      GET /api/closed/thread_chat/<thread_id>
 *
 *  Successful response:
 *      thread: see schemas/thread_chat.js
 *
 *  Error response:
 *      notifications: [See lib/express/response.js]
 */
module.exports = function(_request, _response) {
    var try_count = 0;
    var get_thread = function() {
        SCHEMA_THREAD_CHAT.findOne({
                $and: [{
                    thread_id: _request.params.thread_id
                }, {
                    users: _request.user._id
                }]
            })
            .then(function(thread) {
                if (thread) { //Chat already exists - Return it
                    _response
                        ._R
                        ._DATA("thread", thread)
                        ._SEND();
                } else { //Chat does not exists - Attempt to create it
                    thread = new SCHEMA_THREAD_CHAT({
                            thread_id: _request.params.thread_id,
                            users: _request.query.user_ids,
                            messages: []
                        })
                        .save()
                        .then(function(thread) {
                            _response
                                ._R
                                ._DATA("thread", thread)
                                ._SEND();
                        })
                        .catch(function(err) {
                            if (err.code === 11000 || err.code === 11001) { //Seems to be created while this method tried to create it - Retry get_thread
                                try_count++;
                                if (try_count > 10) { //Make sure eternal loop is prevented
                                    _response
                                        ._R
                                        ._ERROR("Failed to collect messages")
                                        ._STATUS(500)
                                        ._SEND();
                                } else {
                                    get_thread();
                                }
                            } else {
                                _response
                                    ._R
                                    ._ERROR("Unknown error")
                                    ._STATUS(500)
                                    ._SEND();
                                console.trace(err);
                            }
                        });
                }
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
    get_thread();
};