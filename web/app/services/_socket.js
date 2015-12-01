var APP = angular.module("APP");
APP.service("_socket", ["_comments", "_user", "socketFactory", function(_comments, _user, socketFactory) {

    var socket = socketFactory();

    socket.on("test", function(data) {
        console.log(data);
    });

    socket.on("connect", function() {
    	console.log("Iam");
        socket.emit("join", {
            room: "room1"
        });
    });
}]);