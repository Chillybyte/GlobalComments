/*_ASSIGN_ MSN*/

/*
In this controller we are using three of our Angular services found in
web/global_comments/src/services. These services acts as a layer between our 
view in our frontend and the backend that holds their data.
*/

var GLOBAL_COMMENTS = angular.module("GLOBAL_COMMENTS");
GLOBAL_COMMENTS.directive("gcCommentsList", [function() {
    return {
        replace: true,
        restrict: "E",
        show_left_pane: "=",
        templateUrl: "components/gc-frame/gc-comments-list/template.html",
        controller: ["$scope", "_user", "_chat", "_comments", "$window", function($scope, _user, _chat, _comments, $windows) {
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

            /*
            Since we are using a master / detail structure for displaying first the 
            comment tracks and then the list of comments themselves, our left "detail"
            pane is handled according to the chosen context in the "master" right pane
            */

            $scope.set_left_pane = function(value, user_ids, reference, type) {
                $scope.show_left_pane = value;
                $scope.current.user_ids = user_ids;
                $scope.current.reference = reference;
                $scope.current.type = type;
            };

            /*
            Here we place our function inside a javascript confirm alert box, that handles
            the actual user choice before either continuing deleting a comment or doing nothing
            */

            $scope.delete_comment = function(comment_id, $index, reference) {
                var x = confirm("Are you sure you want to delete your comment?");
    
                if (x) {
                    _comments.delete_a_comment(comment_id, $index, reference);
                    console.log(_comments.get_comments(reference).messages[$index]);
                    _comments.get_comments(reference).messages.splice($index, 1);
                } else {
                    return false;
                };
            }

        }]
    };
}]);