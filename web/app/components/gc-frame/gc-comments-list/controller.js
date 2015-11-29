var APP = angular.module("APP");
APP.directive("gcCommentsList", [function() {
    return {
        replace: true,
        restrict: "E",
        show_left_pane: "=",
        templateUrl: "components/gc-frame/gc-comments-list/template.html",
        controller: ["$scope", "_user", "_comments", function($scope, _user, _comments) {
            $scope.thread_comments = _user.thread_comments;

            $scope.get_comments = function(reference) {
                var test = _comments.comments(reference)
                console.log("|||||||||||||||||");
                console.log(test);
                console.log("|||||||||||||||||");
                return test;
            };

            $scope.current_thread = undefined; //current thread selected in list of threads
            $scope.new_message = ""; //Message to send to selected thread (current thread)
            /**
             * Comments in a thread by sending reference and the message that needs to be
             * attached to the reference
             * 
             * @reference: String <URL>
             * @new_message: String
             */
            $scope.new_comment = function(reference, new_message) {
                _comments.new_comment(reference, new_message)
                    .then(function() {
                        $scope.new_message = "";
                    });
            };

            $scope.set_left_pane = function(value, thread) {
                $scope.current_thread = thread;
                $scope.show_left_pane = value;
            };

        }]
    };
}]);