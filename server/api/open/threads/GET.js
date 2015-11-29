var SCHEMA_THREAD_COMMENT = require(process.env.APP_SCHEMA_THREAD_COMMENT);
module.exports = function(_request, _response) {
    var reference = new Buffer(_request.params.reference).toString("base64");
    console.log(_request.params.reference);
    var get_thread = function() {
        SCHEMA_THREAD_COMMENT.findOne({
                reference: reference
            })
            .then(function(result) {
                if (!result) {
                    var thread = new SCHEMA_THREAD_COMMENT({
                        reference: reference,
                        uri: _request.params.reference,
                        users: [],
                        messages: []
                    });
                    thread.save()
                        .then(function(result) {
                            _response
                                ._R
                                ._DATA("thread", result)
                                ._SEND();
                        })
                        .catch(function(err) {
                            if (err.code === 11000 || err.code === 11001) {
                                //Attemt to collect the thread since it seems it was created while this proccess tried to create it
                                get_thread();
                            } else {
                                _response
                                    ._R
                                    ._ERROR("Failed to collect comments")
                                    ._SEND();
                                console.trace(err);
                            }
                        });

                } else {
                    _response
                        ._R
                        ._DATA("thread", result)
                        ._SEND();
                }
            })
            .catch(function(err) {
                _response
                    ._R
                    ._ERROR("Failed to collect comments")
                    ._SEND();
                console.trace(err);
            });
    };


    get_thread();

};