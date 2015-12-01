var GLOBAL_COMMENTS = angular.module("GLOBAL_COMMENTS");
GLOBAL_COMMENTS.directive("gcCommentsList", [function() {
    return {
        replace: true,
        restrict: "E",
        show_left_pane: "=",
        templateUrl: "components/gc-frame/gc-comments-list/template.html",
        controller: ["$scope", "_user", "_comments", function($scope, _user, _comments) {
            $scope.thread_comments = _user.thread_comments;

            $scope.get_comments = function(reference) {
                var ruff = _comments.comments(reference)
                return ruff;
            };


            $scope.current = {
                thread: undefined,
                message: undefined
            };
            /**
             * Comments in a thread by sending reference and the message that needs to be
             * attached to the reference
             * 
             * @reference: String <URL>
             * @message: String
             */
            $scope.new_comment = function(reference, message) {
                _comments.new_comment(reference, message)
                    .then(function() {
                        $scope.current.message = "";
                    });
            };

            $scope.set_left_pane = function(value, thread) {
                $scope.current.thread = thread;
                $scope.show_left_pane = value;
            };

        }]
    };
}]);