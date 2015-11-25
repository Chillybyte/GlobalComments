var SCHEMA_THREAD_COMMENT = require(process.env.APP_SCHEMA_THREAD_COMMENT),
    SCHEMA_MESSAGE = require(process.env.APP_SCHEMA_MESSAGE);

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
                if (!result)
                    _response
                    ._R
                    ._ERROR("Failed to make a comment, please try again late")
                    ._SEND();
                else {
                    console.log(result);
                    result.messages.push(message);
                    result.save()
                        .then(function(result) {
                            _response
                                ._R
                                ._DATA("message", message)
                                ._SEND();
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