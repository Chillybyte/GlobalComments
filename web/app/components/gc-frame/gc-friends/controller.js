var APP = angular.module("APP");
APP.directive("gcFriends", [function() {
    return {
        replace: true,
        scope: {
            reference: "="
        },
        restrict: "E",
        templateUrl: "components/gc-frame/gc-friends/template.html",
        controller: ["$scope", "_user", function($scope, _user) {
            $scope.show_left = true;
        }]
    };
}]);