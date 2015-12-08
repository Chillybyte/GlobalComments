/*_ASSIGN_ RE*/
var APP = angular.module("APP");
APP.directive("compFooter", [function() {
    return {
        replace: true,
        restrict: "E",
        templateUrl: "components/comp-footer/template.html"
    };
}]);