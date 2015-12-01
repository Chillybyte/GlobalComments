var GLOBAL_COMMENTS = angular.module("GLOBAL_COMMENTS");
GLOBAL_COMMENTS.directive("gcChatList", [function() {
    return {
        replace: true,
        restrict: "E",
        show_left_pane: "=",
        templateUrl: "components/gc-frame/gc-chat-list/template.html",
        controller: ["$scope", "_user", "_chat", function($scope, _user, _chat) {
            $scope.user = _user.user;
            $scope.thread_chats = _user.thread_chats;
            console.log($scope.thread_chats);

            $scope.get_friend = function(user_id) {
                return _user.get_friend(user_id);
            };

            $scope.get_messages = function(user_ids) {
                return _chat.get_messages(user_ids);
            };

            $scope.set_left_pane = function(value, thread) {
                $scope.current.thread = thread;
                $scope.show_left_pane = value;
            };

        }]
    };
}]);