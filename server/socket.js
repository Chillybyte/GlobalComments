var express = require('express'),
    http = require('http'),
    io = require('socket.io'),
    passportSocketIo = require('passport.socketio');

var exports = module.exports = function(app, sessionStore, cookieParser) {

    //Creates the server object for the socket to listen on.
    var socket = io(app);

    /**
     *  Authorize users when they connect via sockets
     */
    socket.use(passportSocketIo.authorize({
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
//        console.log(socket.user);

        /**
         *  Accepts the connection
         *  A message may be sent to client via accept
         */
        accept();
    }

    /**
     *  Callback function i user was not signed in successfully
     *  Set back a message for the client
     */
    function on_auth_fail(socket, message, error, accept) {
        /**
         *  Send back a message for the client if needed
         */
        if (error)
            accept(new Error(message));
    }

    /**
     *  All event listeners goes in this section
     */
    socket.on('connection', function(socket) {
        var _user = socket.conn.request.user;
        console.log('Connection made by ' + _user.username);

        socket.on('disconnect', function() {
            console.log(_user.username + ' disconnected');
        });
    });
};