var APP = angular.module("APP");
APP.controller("trymeController", ["$scope", "_user", function($scope, _user) {
    $scope.user = _user.user;
}]);