var APP = angular.module("APP");
APP.directive("gcFriends", [function() {
    return {
        replace: true,
        restrict: "E",
        templateUrl: "components/gc-frame/gc-friends/template.html",
        controller: ["$scope", "_user", function($scope, _user) {
            $scope.search_friends_result = _user.search_friends_result;
            $scope.friends = _user.friends;

            $scope.show_left = false;

            $scope.set_left = function(value) {
                $scope.show_left = value;
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