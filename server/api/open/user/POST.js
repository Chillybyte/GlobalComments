var passport = require("passport");

module.exports = function(_request, _response) {
    passport.authenticate("local-signup", function(err, user, info) {
        if (!err) {
            _request.logIn(user, function(err) {
                if (!err) {
                    //Alt er gået godt
                    _response
                        ._R
                        ._DATA("user", user.toJSON())
                        ._SUCCESS("WEE, din bruger blev oprettet!")
                        ._SEND();
                } else {
                    console.trace(err);
                    _response
                        ._R
                        ._ERROR("En ukendt fejl skete")
                        ._STATUS(500)
                        ._SEND();
                } 
            });
        } else {
            console.trace(err);
            _response
                ._R
                ._ERROR("En ukendt fejl skete")
                ._STATUS(500)
                ._SEND();
            }
    });
};