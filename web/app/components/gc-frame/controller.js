var APP = angular.module("APP");
APP.directive("gcFrame", [function() {
    return {
        replace: true,
        scope: true,
        restrict: "E",
        templateUrl: "components/gc-frame/template.html",
        controller: ["$scope", function($scope) {

        }]
    };
}]);