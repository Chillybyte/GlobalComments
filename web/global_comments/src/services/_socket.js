var GLOBAL_COMMENTS = angular.module("GLOBAL_COMMENTS");
GLOBAL_COMMENTS.service("_socket", ["_comments", "_chat", "_user", "socketFactory", function(_comments, _chat, _user, socketFactory) {

    var application = {
        $scope: undefined
    }

    /**
     * Initializing the socket, but it does not connect
     * See this.initialize
     */
    var socket = socketFactory({
        ioSocket: io({
            autoConnect: false
        })
    });

    /**
     *  Use this to track if the user is signed in or not
     */
    var user = _user.user;

    /**
     *  Initializes this service with a $scope.
     *  Use a controller that lives throughout the application, i.e. applicationController
     *
     *  @scope: Scope for applicationController passed to this service to helper build watchers for certain 
     *          values, ex. user.id - If undefined then user is not signed in, vice versa
     */
    this.initialize = function($scope) {
        console.log("init watch");
        application.$scope = $scope;
        application.$scope.$watch("user.id", function(newValue, oldValue) {
            if (newValue && application.$scope) { //Start the socket connection
                console.log("Connecting");
                socket.connect("//" * window.location.host);
            } else { //Shut down the socket connection
                console.log("Disconnecting");
                socket.disconnect();
            }
        });
    };

    /**
     *  All event listeners goes in this section
     */
    socket.on("connect", function() {
        console.log("Connected");

        socket.on("disconnect", function() {
            console.log("Disconnected");
        });


        /**
         *  Event is called when a friend is signing on
         */
        socket.on("friend_online_status", function(data) {
            var l = _user.friends.length;
            for (var i = 0; i < l; i++) {
                if (_user.friends[i]._id === data.friend) {
                    _user.friends[i].online = data.online;
                    break;
                }
            };
        });

        socket.on("friend_request", function(data) {
            _user.friend_request_in.push(data);
        });

        socket.on("friend_reject", function(request_id) {
            var l = _user.friend_request_in.length;
            for (var i = 0; i < l; i++) {
                if (_user.friend_request_in[i]._id === request_id) {
                    _user.friend_request_in.splice(i, 1);
                    break;
                }
            }
            l = _user.friend_request_out.length;
            for (var i = 0; i < l; i++) {
                if (_user.friend_request_out[i]._id === request_id) {
                    _user.friend_request_out.splice(i, 1);
                    break;
                }
            }
            l = _user.friends.length;
            for (var i = 0; i < l; i++) {
                if (_user.friends[i].friend_request_id === request_id) {
                    _user.friends.splice(i, 1);
                    break;
                }
            }

        });

        socket.on("friend_accept", function(friend) {
            var i, l = 0;
            l = _user.friend_request_out.length;
            for (i = 0; i < l; i++) {
                if (_user.friend_request_out[i]._id === friend.friend_request_id) {
                    _user.friend_request_out.splice(i, 1);
                    break;
                }
            };
            l = _user.friend_request_in.length;
            for (i = 0; i < l; i++) {
                if (_user.friend_request_in[i]._id === friend.friend_request_id) {
                    _user.friend_request_in.splice(i, 1);
                    break;
                }
            };
            _user.friends.push(friend);

        });

        socket.on("new_comment", function(comment) {
            var thread = _comments.get_comments(comment.uri);
            if (thread.messages) {
                thread.messages.push(comment.message);
            }
        });

        socket.on("new_chat", function(message) {
            var chat = _chat.get_messages(message.users);
            if (chat.messages) {
                var l = chat.messages.length;
                for (var i = 0; i < l; i++) {
                    if (chat.messages[i]._id === message.message._id) {
                        return;
                    }
                }
                chat.messages.push(message.message);
            }
        });


        //WHO IS ONLINE
        socket.on("who_is_online", function(sender) {
            socket.emit("i_am_online", sender, {
                friend: _user._id
            });
        });
    });
}]);