require('./config.js'); //SECRET HUSH HUSH FILE DO NOT SHARE
require('./settings.js');
var express = require('express'),
    http = require('http'),
    IO = require('socket.io'),
    passportSocketIo = require('passport.socketio'),
    SCHEMA_FRIEND = require(process.env.APP_SCHEMA_FRIEND);

var exports = module.exports = function(app, sessionStore, cookieParser) {

    //Creates the server object for the socket to listen on.
    var io = IO(app);

    /**
     *  Authorize users when they connect via sockets
     */
    io.use(passportSocketIo.authorize({
        cookieParser: cookieParser,
        key: process.env.APP_SERVER_KEY,
        secret: process.env.APP_SERVER_SECRET,
        store: sessionStore,
        success: on_auth_success,
        fail: on_auth_fail,
    }));

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
                //Let's go tell all friends that _user joined the chat
                SCHEMA_FRIEND.get_id_list_of_fiends(_user._id)
                    .then(function(friend_ids) {
                        friend_ids.forEach(function(friend_id) {
                            socket.to(friend_id);
                        });
                        socket.emit("friend_online_status", {
                            friend: _user._id,
                            online: true
                        });

                    });
            } else
                console.trace(err);
        });

        socket.on('disconnect', function() {
            console.log(_user.username + " disconnected");
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
            }
        });
    });
};