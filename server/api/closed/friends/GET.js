/*_ASSIGN_ RE*/
var SCHEMA_USER = require(process.env.APP_SCHEMA_USER);
/**
 *  This API makes it possible to search for a friend based on username,
 *  first_name, last_name and email.
 *
 *  @_request: The actual request by the client
 *      @_request.params.query: <String>
 *  @_response: The actual response to the client
 *
 *  Ex:
 *      GET /api/closed/friends/<query>
 *
 *  Success response
 *      [{
 *          _id: <String> ID of the user
 *          first_name: <String>
 *          last_name: <String>
 *          username: <String>
 *          email: <String>
 *          updated_at: <Date> When did the user last make a change in profile?
 *          created_at: <Date> When did the user create her profile?
 *      }]
 *      notifications: [See lib/express/response.js]
 *  
 *
 *  Error response
 *      notifications: [See lib/express/response.js]
 *
 */
module.exports = function(_request, _response) {
    var search = new RegExp(_request.params.query.replace(" ", "|"), "i")
    SCHEMA_USER.find({
            $and: [{
                $or: [{
                    username: search
                }, {
                    first_name: search
                }, {
                    last_name: search
                }, {
                    email: search
                }],
                _id: {
                    $ne: _request.user._id
                }
            }]
        }, "first_name last_name username email updated_at created_at")
        .then(function(result) {
            if (!result)
                result = [];
            _response
                ._R
                ._DATA("users", result)
                ._SEND();
        })
        .catch(function(err) {
            console.trace(err);
            _response
                ._R
                ._ERROR("Unknown error")
                ._DATA("users", [])
                ._SEND();
        });
};