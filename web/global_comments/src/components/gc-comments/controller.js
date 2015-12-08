/*_ASSIGN_ ET*/
var GLOBAL_COMMENTS = angular.module("GLOBAL_COMMENTS");
GLOBAL_COMMENTS.directive("gcComments", [function() {
    return {
        replace: true,
        scope: {
            reference: "="
        },
        restrict: "E",
        templateUrl: "components/gc-comments/template.html",
        controller: ["$scope", "_user", "_comments", function($scope, _user, _comments) {
            if (!$scope.reference)
                $scope.reference = window.location.href;

            $scope._user = _user.user;

            $scope.comment = {
                reference: $scope.reference,
                message: ""
            };

            $scope.comments = _comments.get_comments($scope.reference);


            $scope.new_comment = function() {
                _comments.new_comment($scope.comment.reference, $scope.comment.message)
                    .then(function(result) {
                        $scope.comment = {
                            reference: $scope.reference,
                            message: ""
                        }
                    });
            };
        }]
    };
}]);