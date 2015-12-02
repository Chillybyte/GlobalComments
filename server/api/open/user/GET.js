var passport = require("passport"),
    SCHEMA_THREAD_COMMENT = require(process.env.APP_SCHEMA_THREAD_COMMENT),
    SCHEMA_THREAD_CHAT = require(process.env.APP_SCHEMA_THREAD_CHAT),
    SCHEMA_FRIEND = require(process.env.APP_SCHEMA_FRIEND);

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
            ._SUCCESS("Welcome back " + user.username + "!");

        SCHEMA_THREAD_COMMENT.find({
                users: user.id
            }, "uri reference is_thread_comment")
            .then(function(result) {
                //console.log(result);
                _response
                    ._R
                    ._DATA("thread_comments", result);

                return SCHEMA_THREAD_CHAT.find({
                    users: user.id
                }, "updated_at created_at users thread_id is_thread_chat");
            })
            .then(function(result) {
                _response
                    ._R
                    ._DATA("thread_chats", result);

                //Finding friend requests made by user
                return SCHEMA_FRIEND.find({
                    $and: [{
                        "requester.user": user.id
                    }, {
                        "requester.accepted": false
                    }, {
                        "requestee.accepted": true
                    }, {
                        "requestee.ignore": false
                    }]
                }, "requester created_at updated_at");
            })
            .then(function(result) {
                //console.log(result);
                _response
                    ._R
                    ._DATA("friend_request_out", result);

                //Finding friend request made for user
                return SCHEMA_FRIEND.find({
                    $and: [{
                        "requestee.user": user.id
                    }, {
                        "requestee.accepted": true
                    }, {
                        "requester.accepted": false
                    }, {
                        "requester.ignore": false
                    }]
                }, "requestee created_at updated_at");
            })
            .then(function(result) {
                _response
                    ._R
                    ._DATA("friend_request_in", result);

                //Finding friends for user
                return SCHEMA_FRIEND.find({
                    $and: [{
                        $or: [{
                            "requestee.user": user.id
                        }, {
                            "requester.user": user.id
                        }]
                    }, {
                        "requestee.accepted": true
                    }, {
                        "requester.accepted": true
                    }, {
                        "requester.ignore": false
                    }, {
                        "requestee.ignore": false
                    }]
                })
            })
            .then(function(result) {
                var l = result.length;
                var friends = [];
                for (var i = 0; i < l; i++) {
                    if (result[i].requester.user.toString() === _request.user._id.toString()) {
                        friends.push({
                            friend_request_id: result[i]._id,
                            _id: result[i].requestee.user,
                            created_at: result[i].created_at,
                            updated_at: result[i].updated_at
                        });
                    } else {
                        friends.push({
                            friend_request_id: result[i]._id,
                            _id: result[i].requester.user,
                            created_at: result[i].created_at,
                            updated_at: result[i].updated_at
                        });
                    }
                }
                _response
                    ._R
                    ._DATA("friends", friends);
            })
            .catch(function(err) {
                _response
                    ._R
                    ._ERROR("Failed to collect comments and/or friend list")
                    ._DATA("thread_comments", []);
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