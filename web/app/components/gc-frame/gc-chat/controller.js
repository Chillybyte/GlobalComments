var APP = angular.module("APP");
APP.directive("gcChat", [function() {

    return {
        replace: true,
        scope: true,
        restrict: "E",
        templateUrl: "components/gc-frame/gc-chat/template.html",
        controller: ['$scope', '_user', '_notifications', function($scope, _user, _notifications) {
            $scope.user = _user.user;


        }]
    };

}]);