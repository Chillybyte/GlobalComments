var passport = require("passport");

module.exports = function(_request, _response, _next) {
    console.log(_request.body);
    passport.authenticate("local-signup", function(err, user, info) {
        if (!err) {
            _request.logIn(user, function(err) {
                if (!err) {
                    //Alt er gået godt
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