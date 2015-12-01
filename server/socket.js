var http = require('http'),
    io = require('socket.io');

var exports = module.exports = function(app) {

    //Creates the server object for the socket to listen on.
    var socket_server = io(app);

    console.log(socket_server);

    //Creates the socket on the server
    socket_server.on('connection', function(socket) {
        console.log('Someone Connected YAY we are not alone');
        socket.on('disconnect', function() {
            console.log('He left :(');
        });

        //If used join, then execute code inside
        socket.on('join', function(data) {
            if (true) {
                console.log(data)
            };
        });

        //console.log(socket_server);
        socket.emit('test', {
            message: 'Dette er en test besked do you read'
        });
    });

    console.log("Vi når hertil og det er slutningen af socket.js");
    console.log(socket_server);
};