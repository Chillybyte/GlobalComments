var APP = angular.module("APP");
APP.directive("gcNavbar", [function() {
    return {
        replace: true,
        restrict: "E",
        nav_dialogs: "=",
        show_left_pane: "=",
        templateUrl: "components/gc-frame/gc-navbar/template.html",
        controller: ["$scope", function($scope) {
            console.log($scope.nav_dialogs);
            $scope.toggle_navbar = function(dialog) {
                $(".nav-container-options")
                    .stop()
                    .slideToggle("slide");
                $('#comp-container')
                    .stop()
                    .toggle("slide", function() {
                        //Shutting down all dialogs in gc-frame
                        for (var key in $scope.nav_dialogs) {
                            if ($scope.nav_dialogs.hasOwnProperty(key))
                                $scope.nav_dialogs[key] = false;
                        }
                    });
            };


            $scope.the_toggler = function(dialog) {
                console.log(dialog);
                console.log($scope.nav_dialogs);
                var state = !$scope.nav_dialogs[dialog];

                for (var key in $scope.nav_dialogs) {
                    if ($scope.nav_dialogs.hasOwnProperty(key))
                        $scope.nav_dialogs[key] = false;
                }

                $scope.nav_dialogs[dialog] = state;
            }

        }]
    };
}]);