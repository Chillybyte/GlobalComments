var IO = require('socket.io'),
    request = require("request"),
    io;

module.exports = function(app, API_KEY) {

    //Creates the server object for the socket to listen on.
    io = IO(app);

    /**
     *  Authorize users when they connect via sockets
     */
    io.use(function(_socket, _next) {
        //At this point we will not be nexting...
        console.log(_socket.handshake.headers.cookie);

        var headers = {
            cookie: _socket.handshake.headers.cookie
        };

        request({
            method: "GET",
            url: "http://192.168.1.6:8000/api/open/user",
            preambleCRLF: true,
            postambleCRLF: true,
            headers: headers,
            qs: {
                api_key: API_KEY
            }
        }, function(_error, _response, _result) {
            if (!_error) {
                var result = JSON.parse(_result);
                if (result.user) {
                    _socket.conn.request.user = result.user;
                    _next();
                } else {
                    console.trace(_result);
                    _next(new Error("Not signed in"));
                    _socket.disconnect();
                }
            } else {
                console.trace(_error);
                _next(new Error("Unknown error"));
                _socket.disconnect();
            }
        });
    });

    /**
     *  Callback function if user was signed in successfully
     *  Use this to set initial rooms for the socket
     */
    function on_auth_success(socket, accept) {
        console.log("Auth success");
        /**
         *  Accepts the connection
         *  A message may be sent to client via accept
         */
        accept();
    };

    /**
     *  Callback function i user was not signed in successfully
     *  Set back a message for the client
     */
    function on_auth_fail(socket, message, error, accept) {
        console.trace("Auth failed");
        /**
         *  Send back a message for the client if needed
         */
        if (error)
            accept(new Error(message));
    };

    /**
     *  All event listeners goes in this section
     */
    io.on('connection', function(socket) {
        var _user = socket.conn.request.user;
        console.log('Connection made by ' + _user.username);
        socket.join(_user._id, function(err) {
            console.log(_user.username + " joined room " + _user._id);
            if (!err) {
                /*                //Let's go tell all friends that _user joined the chat
                                SCHEMA_FRIEND.get_id_list_of_fiends(_user._id)
                                    .then(function(friend_ids) {
                                        friend_ids.forEach(function(friend_id) {
                                            socket.to(friend_id);
                                        });
                                        socket.emit("friend_online_status", {
                                            friend: _user._id,
                                            online: true
                                        });

                                    });*/
            } else
                console.trace(err);
        });

        socket.on('disconnect', function() {
            console.log(_user.username + " disconnected");
            /* 
    var room = io.sockets.adapter.rooms[_user._id];
     if (!room) {
         SCHEMA_FRIEND.get_id_list_of_fiends(_user._id)
             .then(function(friend_ids) {
                 friend_ids.forEach(function(friend_id) {
                     socket.to(friend_id);
                 });
                 socket.emit("friend_online_status", {
                     friend: _user._id,
                     online: false
                 });
             });
     }*/
        });
    });
};