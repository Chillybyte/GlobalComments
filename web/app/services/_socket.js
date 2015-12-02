var APP = angular.module("APP");
APP.service("_socket", ["_comments", "_user", "socketFactory", function(_comments, _user, socketFactory) {

    var socket = socketFactory();

    socket = io.connect('//' + window.location.host, {
        query: 'session_id=' + readCookie('express.sid')
    });

    //Test
    socket.on("test", function(data) {
        console.log(data);
    });

    //On connect, join room 1
    socket.on("connect", function() {
        console.log("Iam");
        socket.emit("authenticate", {
            user: _user
        });

        socket.emit("join", {
            room: "room1"
        });
    });
}]);