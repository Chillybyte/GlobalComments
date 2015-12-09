/*_ASSIGN_ DO; ET; RE; MSN;*/

/*
 *  The user service allows us to get and use our users from the back end
 *  in our front end.
 */

var GLOBAL_COMMENTS = angular.module('GLOBAL_COMMENTS');
GLOBAL_COMMENTS.service('_user', ['_http', function(_http) {
    var current_search = 0; //Keeps track of what search is currently active to prevent callbacks from overlapping each other

    this.user = {
        id: false
    };
    this.users = {}; //Users found in backend - May it be by search result or friends

    this.friend_request_out = []; //Friend requests made from this user to other users
    this.friend_request_in = []; //Friend requests made from other users to this user
    this.friends = []; //Actual friends

    this.thread_comments = []; //All comments that this user is involved with
    this.thread_chats = [];

    this.search_friends_result = []; //Users found for a current search

    //Mail pattern that allows us to check if the email is typed in legit.
    this.is_email_valid = function(email) {
        var mailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return mailPattern.test(email);
    };

    /*
     *
     * Sign_in allows us to ask our backend for login. 
     * 
     * @url     - server/api/open/user
     * @method  - GET
     * @data    - Sends the user data email and password
     *              {
     *                  silent: false
     *              }
     *
     * Returns: returns a promise where either the user gets
     * signed in or gets a error.
     */
    this.sign_in = function(data) {
        var _this = this;
        return _http.get("/api/open/user", data)
            .then(function(result) {
                angular.copy(result.data.user, _this.user);
                angular.copy(result.data.friend_request_out, _this.friend_request_out);
                angular.copy(result.data.friend_request_in, _this.friend_request_in);
                angular.copy(result.data.friends, _this.friends);
                angular.copy(result.data.thread_comments, _this.thread_comments);
                angular.copy(result.data.thread_chats, _this.thread_chats);
            });
    };

    /**
     *
     * Creates a user from inputed data in front end.
     * 
     * @url     - server/api/open/user
     * @method  - POST
     * @data    - sends the user data
     *              {
     *                  silent: false
     *              }
     *
     * Returns: signs in the user if it suceeds
     */
    this.create_user = function(data) {
        var _this = this;
        return _http.post('/api/open/user/', data)
            .then(function(result) {
                angular.copy(result.data.user, _this.user);
            });
    };

    //Signs the user out with a get.
    this.sign_out = function() {
        return _http.get("/api/sign_out");
    };

    /**
     *
     * checks if the user is signed in and signs in if true
     * 
     * @url     - server/api/open/user
     * @method  - GET
     * @options - JavaScript Object with options
     *              {
     *                  silent: true
     *              }
     *
     * Returns: The user is signed in
     */
    this.authenticate = function() {
        var _this = this;
        return _http.get("/api/open/user", null, {
                silent: true
            })
            .then(function(result) {
                angular.copy(result.data.user, _this.user);
                angular.copy(result.data.friend_request_out, _this.friend_request_out);
                angular.copy(result.data.friend_request_in, _this.friend_request_in);
                angular.copy(result.data.friends, _this.friends);
                angular.copy(result.data.thread_comments, _this.thread_comments);
                angular.copy(result.data.thread_chats, _this.thread_chats);
            });
    };


    /**
     *
     * Allows the front to get the user his/her
     * friend list from the server.
     * 
     * @url     - server/api/closed/friends + query
     * @method  - GET
     * @data    - nothing
     * @options - JavaScript Object with options
     *              {
     *                  silent: true
     *              }
     *
     * Returns: an array with user id's
     */
    this.find_friends = function(query) {
        var _this = this;

        current_search++;
        var cs = current_search;
        _http.get("/api/closed/friends/" + query, null, {
                silent: true
            })
            .then(function(result) {
                if (cs === current_search) {
                    if (!result.data.users)
                        result.data.users = [];
                    var l = result.data.users.length;
                    for (var i = 0; i < l; i++) {
                        if (!_this.users[result.data.users[i].id]) {
                            _this.users[result.data.users[i].id] = result.data.users[i]
                        }
                    }
                    angular.copy(result.data.users, _this.search_friends_result);
                }
                console.log(_this.users);
            })
            .catch(function() {
                angular.copy([], _this.search_friends_result);
            })
    };

    /**
     *
     * 
     * 
     * @url     - server/api/closed/friends + user id
     * @method  - POST
     * @data    - The friend which is to be added
     *              {
     *                  silent: false
     *              }
     *
     * Returns: adds the friend in the front end to.
     */
    this.add_friend = function(user_id) {
        var _this = this;
        _http.post("/api/closed/friends/" + user_id)
            .then(function(result) {
                if (result.data.friend_request_out) {
                    _this.friend_request_out.push(result.data.friend_request_out);
                }
                if (result.data.friend) {
                    var i, l = 0;
                    l = _this.friend_request_out.length;
                    for (i = 0; i < l; i++) {
                        if (_this.friend_request_out[i]._id === result.data.friend.friend_request_id) {
                            _this.friend_request_out.splice(i, 1);
                            break;
                        }
                    };
                    l = _this.friend_request_in.length;
                    for (i = 0; i < l; i++) {
                        if (_this.friend_request_in[i]._id === result.data.friend.friend_request_id) {
                            _this.friend_request_in.splice(i, 1);
                            break;
                        }
                    };
                    _this.friends.push(result.data.friend);
                }
            })
            .catch(function(err) {
                console.trace(err);
            });
    };

    /**
     *
     * Allows us to remove a friend request.
     * 
     * @url     - server/api/closed/friends/ + request id
     * @method  - DELETE
     * @data    - nada null nothing
     *              {
     *                  silent: false
     *              }
     *
     * Returns: zipp nade nothing EVERYTHING IS GONE
     */
    this.remove_friend_request = function(request_id) {
        var _this = this;
        return _http.delete("/api/closed/friends/" + request_id)
            .then(function(result) {
                //Removing any friend request from in and out, and from friends
                var i, l = 0;
                l = _this.friend_request_out.length;
                for (i = 0; i < l; i++) {
                    if (_this.friend_request_out[i]._id === request_id) {
                        _this.friend_request_out.splice(i, 1);
                        break;
                    }
                };
                l = _this.friend_request_in.length;
                for (i = 0; i < l; i++) {
                    if (_this.friend_request_in[i]._id === request_id) {
                        _this.friend_request_in.splice(i, 1);
                        break;
                    }
                };
                l = _this.friends.length;
                for (i = 0; i < l; i++) {
                    if (_this.friends[i].friend_request_id === request_id) {
                        _this.friends.splice(i, 1);
                        break;
                    }
                }
            });
    };

    /**
     *
     * This method is for getting a friends user info
     * 
     * @url     - server/api/closed/users/ + user id
     * @method  - GET
     * @data    - nothing
     *              {
     *                  silent: true
     *              }
     *
     * Returns: the user data for the requested user
     */
    this.get_friend = function(user_id) {
        console.log("user_id: " + user_id);
        var _this = this;
        if (_this.users[user_id]) {
            return _this.users[user_id];
        }
        if (!_this.users[user_id])
            _this.users[user_id] = {};
        var user = _this.users[user_id];

        _http.get("/api/closed/users/" + user_id, undefined, {
                silent: true
            })
            .then(function(result) {
                console.log(result.data);
                angular.copy(result.data.user, user);
            });
        return user;
    };

    /**
     *
     * Updated the user in the backend with data from the user.
     * 
     * @url     - server/api/closed/users + user id
     * @method  - PUT
     * @data    - the data to be updated
     *              {
     *                  silent: false
     *              }
     *
     * Returns: nothing
     */
    this.update_user = function(data, user_id) {
        var _this = this;
        return _http.put("/api/closed/users/" + user_id, data)
            .then(function(result) {
                angular.copy(result.data.user, _this.user);
            });
    }

}]);