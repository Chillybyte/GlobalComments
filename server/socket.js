var express = require('express'),
    http = require('http'),
    io = require('socket.io'),
    passportSocketIo = require('passport.socketio');

var exports = module.exports = function(app, sessionStore, cookieParser) {

    //Creates the server object for the socket to listen on.
    var socket = io(app);

    //console.log(socket);

    //When socket is set we will authourize
    // socket.use(passportSocketIo.authorize({
    //     cookieParser: cookieParser, // the same middleware you registrer in express
    //     key: 'express.sid', // the name of the cookie where express/connect stores its session_id
    //     secret: process.env.APP_SERVER_SECRET, // the session_secret to parse the cookie
    //     store: sessionStore, // we NEED to use a sessionstore. no memorystore please
    //     success: onAuthorizeSuccess, // *optional* callback on success - read more below
    //     fail: onAuthorizeFail, // *optional* callback on fail/error - read more below
    // }));

    // function onAuthorizeSuccess(data, accept) {
    //     console.log('successful connection to socket.io');
    //     console.log('socket user on success');
    //     console.log(socket.request.user);
    //     console.log();
    //     // The accept-callback still allows us to decide whether to
    //     // accept the connection or not.
    //     // accept(null, true);
    //     // OR

    //     // If you use socket.io@1.X the callback looks different
    //     accept();
    // }

    // function onAuthorizeFail(data, message, error, accept) {
    //     if (error)
    //         throw new Error(message);
    //     console.log('failed connection to socket.io:', message);

    //     // We use this callback to log all of our failed connections.
    //     // accept(null, false);

    //     // OR
    //     console.log('error: ' + error);
    //     console.log('message: ' + message);
    //     //console.log(socket);


    //     // If you use socket.io@1.X the callback looks different
    //     // If you don't want to accept the connection
    //     if (error)
    //         accept(new Error(message));
    //     // this error will be sent to the user as a special error-package
    //     // see: http://socket.io/docs/client-api/#socket > error-object
    // }


    // /*
    //     function onAuthorizeFail(data, message, error, accept) {
    //         // error indicates whether the fail is due to an error or just a unauthorized client
    //         if (error) throw new Error(message);
    //         console.log('error: ' + error);
    //         console.log('message: ' + message);
    //         console.log();

    //         // send the (not-fatal) error-message to the client and deny the connection
    //         return accept(new Error(message));
    //     }
    // */


    //console.log('Her starter socket......................................');
    //console.log(socket);
    //console.log('Her slutter socket......................................');


    var access = true;

    //Creates the socket on the server
    socket.on('connection', function(socket) {
        //console.log('Someone Connected.........................................');
        //console.log();

        socket.on('disconnect', function() {
            //console.log('He left :(    ........................................');
            //console.log();
        });


        //Join Room
        socket.on('join', function(data) {
            socket.join(data.room);
        });

        //Leave Room
        socket.on('leave', function(data) {
            socket.leave(data.room);
        });

        //Chat Message
        socket.on('chat_message', function(data) {
            if (data.room) {
                //Sends message to the room defined
                socket.to(data.room).emit('chat_message', data);
                //So sender also receives the message
                socket.emit('chat_message', data);
            };
            if (data._id) {
                socket.to(data._id).emit('chat_message', data);
                //So sender also receives the message
                socket.emit('chat_message', data);
            };
        });

        //Chat Comment
        socket.on('comment_message', function(data) {
            if (data.comment && data.reference) {
                socket.to(data.reference).emit('comment_message', data);
                //So sender also receives the message
                socket.emit('comment_message', data);
            };
        });


        //console.log(socket);
        socket.emit('test', {
            message: 'Dette er en test, i slutningen af serveren, do you read !?'
        });
    });
};