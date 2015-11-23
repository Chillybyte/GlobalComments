var APP = angular.module("APP");
APP.directive("tryMe", [function() {
    return {
        replace: true,
        restrict: "E",
        templateUrl: "application/tryme/template.html"
    };
}]);