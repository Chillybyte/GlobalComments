var APP = angular.module("APP");
APP.directive("gcNavbar", [function() {
    return {
        replace: true,
        restrict: "E",
        templateUrl: "components/gc-frame/gc-navbar/template.html",
        controller: ["$scope", function($scope) {
        	$('#comp-container').hide();
            $('#hamburger').click(function() {
                $('#comp-container').toggle("slide");
            });
        }]
    };
}]);