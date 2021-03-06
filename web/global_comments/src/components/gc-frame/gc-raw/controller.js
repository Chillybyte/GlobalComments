/*_ASSIGN_ RE*/
var GLOBAL_COMMENTS = angular.module("GLOBAL_COMMENTS");
GLOBAL_COMMENTS.directive("gcRaw", [function() {
    return {
        replace: true,
        restrict: "E",
        show_left_pane: "=",
        templateUrl: "components/gc-frame/gc-raw/template.html",
        controller: ["$scope", "_user", "_chat", "_comments", function($scope, _user, _chat, _comments) {
            $scope.user = _user.user;

            $scope.thread_chat_comments = _user.thread_chats.concat(_user.thread_comments);

            $scope.current = {
                user_ids: undefined,
                message: "",
                reference: undefined
            };

            $scope.get_comments = function(reference) {
                return _comments.get_comments(reference);
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

            $scope.get_friend = function(user_id) {
                return _user.get_friend(user_id);
            };

            $scope.get_messages = function(user_ids) {
                return _chat.get_messages(user_ids);
            };

            $scope.new_message = function(user_ids, message) {
                _chat.new_message(user_ids, message)
                    .then(function() {
                        $scope.current.message = "";
                    });
            };

            $scope.set_left_pane = function(value, user_ids, reference, type) {
                $scope.show_left_pane = value;
                $scope.current.user_ids = user_ids;
                $scope.current.reference = reference;
                $scope.current.type = type;
            };

        }]
    };
}]);