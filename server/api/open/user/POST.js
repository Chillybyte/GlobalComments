/*_ASSIGN_ RE*/
var passport = require("passport");

/**
 *  Creates a new user in the database
 * 
 *  @_request: The actual request from client
 *      @_request.body: See schemas/user.js
 *  @_response: the actual response to client - Expanded while method progresses
 *  @_next: An express callback to tell any method to continue with the next process in line if any
 *
 *  Ex:
 *      POST /api/open/user
 *          { first_name: <String>, last_name: <String>, Username: <String>, email: <String>, password: <String>, repeat_password: <String> }
 *
 *  Success response:
 *      user: see schemas/user.js
 *
 *  Error response
 *      notifications: [See lib/express/response.js]
 */
module.exports = function(_request, _response, _next) {
    passport.authenticate("local-signup", function(err, user, info) {
        if (!err) {
            _request.logIn(user, function(err) {
                if (!err) {
                    _response
                        ._R
                        ._DATA("user", user.toJSON())
                        ._SUCCESS("Your profile was created!")
                        ._SEND();
                } else {
                    console.trace(err);
                    _response
                        ._R
                        ._ERROR("An unknown error occurred")
                        ._STATUS(500)
                        ._SEND();
                }
            });
        } else {
            console.trace(err);
            _response
                ._R
                ._ERROR(err)
                ._STATUS(500)
                ._SEND();
        }
    })(_request, _response, _next);
};