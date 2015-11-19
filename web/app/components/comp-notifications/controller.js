var APP = angular.module("APP");
APP.directive("compNotifications", [function() {
    return {
        replace: true,
        scope: true,
        templateUrl: "components/comp-notifications/template.html",
        controller: ["$scope", "_notifications", function($scope, _notifications) {
            $scope.notifications = _notifications.notifications;
        }]
    };
}]);