var APP = angular.module("APP");
APP.directive("gcFriends", [function() {
    return {
        replace: true,
        restrict: "E",
		show_left_pane: "=",
        templateUrl: "components/gc-frame/gc-friends/template.html",
        controller: ["$scope", "_user", function($scope, _user) {
            $scope.search_friends_result = _user.search_friends_result;
            $scope.friends = _user.friends;

            $scope.set_left_pane = function(value) {
                $scope.show_left_pane = value;
            };

            $scope.find_friends = function(query) {
                return _user.find_friends(query);
            };
            $scope.add_friend = function(user_id) {
                return _user.add_friend(user_id);
            };
            $scope.get_friend = function(user_id) {
                return _user.get_friend(user_id);
            };
        }]
    };
}]);