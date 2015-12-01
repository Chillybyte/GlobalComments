var http = require('http'),
    io = require('socket.io');

var exports = module.exports = function(app) {

    //Creates the server object for the socket to listen on.
    var socket_server = io(app);

    //Creates the socket on the server
    socket_server.on('connection', function(socket) {
        console.log('Someone Connected YAY we are not alone');
        console.log();
        console.log('Her starter socket');
        console.log(socket);
        console.log();
        console.log('Her slutter socket');

        var access = false;

        socket.on('authenticate', function(data) {
            access = true;
            console.log(data.user);
        });

        socket.on('disconnect', function() {
            console.log('He left :(');
        });

        //Join Room call
        socket.on('join', function(data) {
            if (access) {
                socket.Room = data.room;
            };
        });

        //Message call
        socket.on('chat_message', function(data) {
            if (access) {
                console.log(data.message);

                console.log(data.receiver);

            };
        });


        //console.log(socket_server);
        socket.emit('test', {
            message: 'Dette er en test besked do you read'
        });
    });
};