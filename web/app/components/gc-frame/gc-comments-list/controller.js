var APP = angular.module("APP");
APP.directive("gcCommentsList", [function() {
    return {
        replace: true,
        restrict: "E",
        show_left_pane: "=",
        templateUrl: "components/gc-frame/gc-comments-list/template.html",
        controller: ["$scope", "_user", "_comments", function($scope, _user, _comments) {

            //$scope.commentThreadDetails = true;
            //$scope.show_left_pane = false;


            // $scope.comment = _user.comments;
            // var user_tests = ["en kommentartråd", "en anden kommentartråd", "en mere kommentartråd"];
            var user_tests = [{
                    reference: "en kommentartråd",
                    comments: "Indhold fra den første kommentar spor"
                }, {
                    reference: "en anden kommentartråd",
                    comments: "Indhold fra den anden kommentar spor"
                }, {
                    reference: "en mere kommentartråd",
                    comments: "Indhold fra et kommentar spor mere"
                }

            ];

            $scope.data = user_tests;
            $scope.set_left_pane = function(value, sectionIndex) {
                console.log(sectionIndex);
                console.log($scope.show_left_pane);
                $scope.comments = user_tests[sectionIndex];
                $scope.show_left_pane = value;
            };

        }]
    };
}]);