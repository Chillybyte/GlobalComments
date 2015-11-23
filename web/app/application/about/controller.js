var APP = angular.module("APP");
APP.directive("about", [function() {
    return {
        replace: true,
        restrict: "E",
        templateUrl: "application/about/template.html"
    };
}]);