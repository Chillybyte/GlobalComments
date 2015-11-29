var APP = angular.module("APP");
APP.directive("gcFriends", [function() {
    return {
        replace: true,
        restrict: "E",
        show_left_pane: "=",
        templateUrl: "components/gc-frame/gc-friends/template.html",
        controller: ["$scope", "_user", function($scope, _user) {
            $scope.search_friends_result = _user.search_friends_result;
            $scope.friend_request_out = _user.friend_request_out;
            $scope.friend_request_in = _user.friend_request_in;

            $scope.friends = _user.friends;

            $scope.selected = undefined;

            $scope.open_friend_request_in = function(requestee) {
                $scope.selected = requestee;
                $scope.left_state = "friend_request_in";
                $scope.show_left_pane = true;
            };

            $scope.open_friend_request_out = function(requester) {
                $scope.selected = requester;
                $scope.left_state = "friend_request_out";
                $scope.show_left_pane = true;
            };

            $scope.open_friend = function(friend) {
                $scope.selected = friend;
                $scope.left_state = "friend";
                $scope.show_left_pane = true;
            };

            $scope.open_search_friends = function() {
                $scope.left_state = "search_friends";
                $scope.show_left_pane = true;
            };

            $scope.left_state = "";
            $scope.set_left_pane = function(value, left_state) {
                $scope.show_left_pane = value;
                $scope.left_state = left_state;
            };

            $scope.find_friends = function(query) {
                return _user.find_friends(query);
            };
            $scope.add_friend = function(user_id) {
                return _user.add_friend(user_id);
            };
            $scope.remove_friend_request = function(request_id) {
                _user.remove_friend_request(request_id)
                    .then(function() {
                        $scope.selected = undefined;
                        $scope.left_state = "";
                        $scope.show_left_pane = false;
                    });
            };
            $scope.get_friend = function(user_id) {
                return _user.get_friend(user_id);
            };
        }]
    };
}]);