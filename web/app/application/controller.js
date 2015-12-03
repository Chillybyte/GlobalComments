var APP = angular.module("APP");
APP.controller("applicationController", ["$scope", "_notifications", "_socket", function($scope, _notifications, _socket) {
    _socket.initialize($scope);
}]);