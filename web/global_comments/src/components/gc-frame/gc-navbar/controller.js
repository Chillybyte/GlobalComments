/*_ASSIGN_ ET*/

//This controller allows us to use services and assign namespace to certain components in our gc navbar html
//We are using no services but a lot of functionality as this is uniquely used here only
var GLOBAL_COMMENTS = angular.module("GLOBAL_COMMENTS");
GLOBAL_COMMENTS.directive("gcNavbar", [function() {
    return {
        replace: true,
        restrict: "E",
        nav_dialogs: "=",
        show_left_pane: "=",
        templateUrl: "components/gc-frame/gc-navbar/template.html",
        controller: ["$scope", function($scope) {
            console.log($scope.nav_dialogs);
            $scope.slide_open = true;


            $scope.toggle_navbar = function(dialog) {
                $scope.slide_open = !$scope.slide_open;
                if ($scope.slide_open)
                    open_navbar();
                else
                    close_navbar();
            };

            //Private function
            var open_navbar = function() {
                var speed = 250;

                for (var key in $scope.nav_dialogs) {
                    if ($scope.nav_dialogs.hasOwnProperty(key))
                        $scope.nav_dialogs[key] = false;
                }
                $(".gc-frame")
                    .stop()
                    .animate({
                        height: 350
                    }, speed);
                $(".gc-frame .nav-container-options")
                    .stop()
                    .animate({
                        height: 300
                    }, speed, function() {});
            };

            //Private function
            var close_navbar = function() {
                var speed = 250;
                $(".gc-frame")
                    .stop()
                    .animate({
                        height: 50
                    }, speed);
                $(".gc-frame .nav-container-options")
                    .stop()
                    .animate({
                        height: 0
                    }, speed);
                $("#comp-container")
                    .stop()
                    .animate({
                        width: 0
                    }, speed, function() {
                        for (var key in $scope.nav_dialogs) {
                            if ($scope.nav_dialogs.hasOwnProperty(key))
                                $scope.nav_dialogs[key] = false;
                        }
                    });
            };


            $scope.the_toggler = function(dialog) {
                var state = !$scope.nav_dialogs[dialog];
                var all_closed = true;
                for (var key in $scope.nav_dialogs) {
                    if ($scope.nav_dialogs.hasOwnProperty(key)) {
                        if ($scope.nav_dialogs[key])
                            all_closed = false;
                        $scope.nav_dialogs[key] = false;
                    }
                }
                if (all_closed)
                    state = true;
                $scope.nav_dialogs[dialog] = state;
                console.log(dialog + ": " + state);
            }

        }]
    };
}]);