var APP = angular.module("APP");
APP.directive("gcCommentsList", [function() {
    return {
        replace: true,
        restrict: "E",
        show_left_pane: "=",
        templateUrl: "components/gc-frame/gc-comments-list/template.html",
        controller: ["$scope", function($scope) {

            $scope.set_left = function(value) {
                $scope.show_left_pane = value;
            };
        }]
    };
}]);
