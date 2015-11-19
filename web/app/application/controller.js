var APP = angular.module("APP");
APP.controller("applicationController", ["$scope", "_notifications", function($scope, _notifications) {
    _notifications.ERROR("test");
    _notifications.SUCCESS("test");
    _notifications.INFO("test");
}]);