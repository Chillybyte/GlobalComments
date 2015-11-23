var passport = require("passport");

module.exports = function(_request, _response, _next) {
    if (_request.isAuthenticated()) {
    	var user = _request.user.toJSON();
        _response
            ._R
            ._DATA("user", user)
            ._SUCCESS("Welcome back " + user.username + "!")
            ._SEND();
        return;
    }
    _request.body = _request.query; //Makes sure that passport can read credentials

    passport.authenticate("local-login", function(err, user, info) {
        if (!err) {
            _request.logIn(user, function(err) {
                if (!err) {
                    if (_request.body.remember_me == "true") {
                        _request.session.cookie.maxAge = 21 * 24 * 60 * 60 * 1000;
                    }
                    _response
                        ._R
                        ._DATA("user", user.toJSON())
                        ._SUCCESS("Welcome back " + user.username + "!")
                        ._SEND();
                } else {
                    _response
                        ._R
                        ._ERROR(err)
                        ._STATUS(400)
                        ._SEND();
                }
            });
        } else {
            _response
                ._R
                ._ERROR(err)
                ._STATUS(400)
                ._SEND();
        }
    })(_request, _response, _next);

};