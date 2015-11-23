var APP = angular.module("APP");
APP.directive("index", [function() {
    return {
        replace: true,
        restrict: "E",
        templateUrl: "application/index/template.html"
    };
}]);