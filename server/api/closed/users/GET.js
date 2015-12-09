/*_ASSIGN_ ET*/
var SCHEMA_USER = require(process.env.APP_SCHEMA_USER);

/**
 *
 * The API deletes the registered connection between two users that makes up a "friendship"
 * 
 * @url     - /api/closed/users/"query_data"
 *          - as prescribed in the _thread_comments.js schema
 * @method  - GET
 * 
 *      First we query the database for the reference aka the content that is being commented on,
 *      then pushes the comment content along with the user that authors the comment to the database.
 *      
 *
 *      notifications: [See lib/express/response.js]
 *  
 *
 *  Error response
 *      notifications: [See lib/express/response.js]
 */


module.exports = function(_request, _response) {
    SCHEMA_USER.findOne({
            _id: _request.params.user_id
        })
        .then(function(user) {
            if (user) {
                _response
                    ._R
                    ._DATA("user", user.toJSON())
                    ._SEND();
            } else {
                _response
                    ._R
                    ._ERROR("Friend does not exist")
                    ._STATUS(400)
                    ._SEND();
            }
        })
        .catch(function(err) {
            _response
                ._R
                ._ERROR("Failed to find friend")
                ._STATUS(500)
                ._SEND();
            console.trace(err);
        });
};