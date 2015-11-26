var APP = angular.module("APP");
APP.directive("gcFriends", [function() {
    return {
        replace: true,
        scope: {
            reference: "="
        },
        restrict: "E",
        templateUrl: "components/gc-frame/gc-friends/template.html",
        controller: ["$scope", "_user", function($scope, _user) {
            $scope.search_friends_result = _user.search_friends_result;

            $scope.show_left = false;

            $scope.set_left = function(value) {
                $scope.show_left = value;
            };

            $scope.find_friends = _user.find_friends;

        }]
    };
}]);