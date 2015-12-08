/*_ASSIGN_ DO*/
var APP = angular.module("APP");
APP.directive("compNotification", [function() {
    return {
        replace: true,
        scope: {
            notification: "="
        },
        templateUrl: "components/comp-notifications/comp-notification/template.html",
        controller: ["$scope", "_notifications", function($scope, _notifications) {
            $scope.outer_class = "alert-danger";
            $scope.class = "error";
            $scope.message = $scope.notification.message;
            $scope.id = $scope.notification.id;
            $scope.icon = "fa-ban";

            $scope.remove = function() {
                _notifications.remove($scope.notification);
            };

            (function init() {
                switch ($scope.notification.type) {
                    case "ERROR":
                        $scope.outer_class = "alert-danger";
                        $scope.class = "error";
                        $scope.icon = "fa-ban";
                        break;
                    case "SUCCESS":
                        $scope.outer_class = "alert-success";
                        $scope.class = "success";
                        $scope.icon = "fa-check-circle";
                        break;
                    case "INFO":
                        $scope.outer_class = "alert-info";
                        $scope.class = "info";
                        $scope.icon = "fa-info-circle";
                        break;
                }
            })();
        }],
        /**
         *  Setting the element to fadeout once started and adding handlers to take care of
         *  mousemove (Refresh the message and make it clear)
         *  and mouseleave to restart the timer that fades the element out again
         */
        link: function(scope, element) {
            var box = $(element).closest(".notifications-inner");
            var seconds = 10;
            $(box).fadeOut(1000 * seconds, function() {
                scope.remove();
            });
            $(box).mousemove(function() {
                $(this).css("opacity", 1).stop();
            });
            $(box).mouseleave(function() {
                $(this).fadeOut(1000 * seconds, function() {
                    scope.remove();
                });
            });
        }
    };
}]);