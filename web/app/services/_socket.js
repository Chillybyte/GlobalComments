var APP = angular.module("APP");
APP.service("_socket", ["_comments", "_user", "socketFactory", function(_comments, _user, socketFactory) {

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
        $scope.$watch("user.id", function(newValue, oldValue) {
            if (newValue) //Start the socket connection
                socket.connect("//" * window.location.host);
            else //Shut down the socket connection
                socket.disconnect();
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
    });
}]);