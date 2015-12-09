/*_ASSIGN_ MSN*/
var APP_SCHEMA_USER = require(process.env.APP_SCHEMA_USER),
    SCHEMA_THREAD_COMMENT = require(process.env.APP_SCHEMA_THREAD_COMMENT),
    SCHEMA_MESSAGE = require(process.env.APP_SCHEMA_MESSAGE);

module.exports = function(_request, _response) {

    /**
     *
     * The API finds a reference that allows us to delete a specific comment.
     * 
     * @url     - /api/closed/comment/:delete
     * @method  - DELETE
     * @data    - Receives a comment ID as a parameter
     * 
     *
     *  notifications: [See lib/express/response.js]
     */

    SCHEMA_THREAD_COMMENT.findOne({
            'messages._id': _request.params.delete
        })
        .then(function(thread) {
            var l = thread.messages.length;
            for (var i = 0; i < l; i++) {
                if (thread.messages[i]._id.toString() === _request.params.delete.toString()) {
                    thread.messages.splice(i, 1);
                    return thread.save();
                }
            }
        })
        .then(function(thread) {
            _response
                ._R
                ._SUCCESS("comment deleted")
                ._SEND();
        })
        .catch(function(err) {
            _response
                ._R
                ._ERROR("Failed to delete comment")
                ._STATUS(500)
                ._SEND();
            console.trace(err);
        })
};