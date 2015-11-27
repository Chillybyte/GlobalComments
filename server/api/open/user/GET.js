var passport = require("passport"),
    SCHEMA_THREAD_COMMENT = require(process.env.APP_SCHEMA_THREAD_COMMENT),
    SCHEMA_FRIEND_LIST = require(process.env.APP_SCHEMA_FRIEND_LIST),
    SCHEMA_FRIEND_REQUEST = require(process.env.APP_SCHEMA_FRIEND_REQUEST);

module.exports = function(_request, _response, _next) {

    /**
     *  Collects all essential user information such as
     *  Comments relevant to the user
     *  List of friends
     *
     * @user:   User that was authenticated by passport
     *          It's expected to be user.toJSON() when this function receives user
     *
     */
    var collect_user_details = function(user) {
        _response
            ._R
            ._DATA("user", user)
            ._SUCCESS("Welcome back " + user.username + "!")
        SCHEMA_THREAD_COMMENT.find({
                users: user.id
            }, "reference is_thread_comment")
            .then(function(result) {
                console.log(result);
                _response
                    ._R
                    ._DATA("comments", result);
                return SCHEMA_FRIEND_LIST.find({
                    user: user.id
                })
            })
            .then(function(result) {
                console.log(result);
                _response
                    ._R
                    ._DATA("friend_list", result);
                return SCHEMA_FRIEND_REQUEST.find({
                    $or: [{
                        user: user.id
                    }, {
                        user_requested: user.id
                    }]
                })
            })
            .then(function(result) {
                _response
                    ._R
                    ._DATA("friend_requests", result)
            })
            .catch(function(err) {
                _response
                    ._R
                    ._ERROR("Failed to collect comments and/or friend list")
                    ._DATA("comments", []);
                console.trace(err);
            })
            .finally(function() {
                _response
                    ._R
                    ._SEND();
            });

    };
    if (_request.isAuthenticated()) {
        return collect_user_details(_request.user.toJSON());
    }
    _request.body = _request.query; //Makes sure that passport can read credentials

    passport.authenticate("local-login", function(err, user, info) {
        if (!err) {
            _request.logIn(user, function(err) {
                if (!err) {
                    if (_request.body.remember_me == "true") {
                        _request.session.cookie.maxAge = 21 * 24 * 60 * 60 * 1000;
                    }
                    collect_user_details(user.toJSON());
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