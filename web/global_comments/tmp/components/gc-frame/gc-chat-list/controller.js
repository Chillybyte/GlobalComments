var GLOBAL_COMMENTS = angular.module("GLOBAL_COMMENTS");
GLOBAL_COMMENTS.directive("gcChatList", [function() {
    return {
        replace: true,
        restrict: "E",
        show_left_pane: "=",
        templateUrl: "components/gc-frame/gc-chat-list/template.html",
        controller: ["$scope", "_user", function($scope, _user) {
            $scope.set_left_pane = function(value, thread) {
                $scope.current.thread = thread;
                $scope.show_left_pane = value;
            };

        }]
    };
}]);