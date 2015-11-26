var APP = angular.module("APP");
APP.directive("gcFrame", [function() {
    return {
        replace: true,
        scope: true,
        restrict: "E",
        templateUrl: "components/gc-frame/template.html",
        controller: ["$scope", function($scope) {
            $scope.nav_dialogs = {
                profile: false,
                friends: false,
                raw: false,
                chat: false,
                comments: false
            };
        }]
    };
}]);