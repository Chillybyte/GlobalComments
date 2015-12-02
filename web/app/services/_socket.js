var APP = angular.module("APP");
APP.service("_socket", ["_comments", "_user", "socketFactory", function(_comments, _user, socketFactory) {

    var socket = socketFactory();

    //Test
    socket.on("test", function(data) {
        console.log(data);
    });

    //On connect, join room 1
    socket.on("connect", function() {
    	console.log("Iam " + socket._id);
    	socket.emit("authenticate", {
    		user: _user
    	});

    	socket.on('chat_message', function(data) {
            console.log(data.message);
        });


        socket.emit("join", {
            room: "room1"
        });

        socket.emit("chat_message", {
        	message: 'Hej Room 1 JEG ER HER',
        	room: 'room1'
        });
    });
}]);