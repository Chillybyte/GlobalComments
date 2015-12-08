/*_ASSIGN_ DO*/
var GLOBAL_COMMENTS = angular.module("GLOBAL_COMMENTS");
GLOBAL_COMMENTS.directive("gcFrame", [function() {
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