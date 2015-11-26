var APP = angular.module("APP");
APP.directive("gcNavbar", [function() {
    return {
        replace: true,
        restrict: "E",
        nav_dialogs: "=",
        templateUrl: "components/gc-frame/gc-navbar/template.html",
        controller: ["$scope", function($scope) {
            console.log($scope.nav_dialogs);

            $scope.toggle_navbar = function(dialog) {
                //TODO: Toggle if it should be tiny quadrat or rectangular
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

            $scope.show_left_pane = false;

            $scope.the_toggler = function(state, section) {
                console.log(state + '   ' + section);
                switch (section) {
                    case 'profile':
                        handler(state, section);
                        break;
                    case 'friends':
                        handler(state, section);
                        break;
                    case 'raw':
                        handler(state, section);
                        break;
                    case 'chat':
                        handler(state, section);
                        break;
                    case 'comments':
                        handler(state, section);
                        break;
                }

                for (var key in $scope.nav_dialogs) {
                    if ($scope.nav_dialogs.hasOwnProperty(key))
                        $scope.nav_dialogs[key] = false;
                }
            }

            function handler(state, section) {
                var current = !$scope.nav_dialogs[section];
                $scope.show_left_pane = state;
            };
        }]
    };
}]);