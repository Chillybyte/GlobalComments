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
            if (!$scope.reference) //Make sure that a reference is always present as a minimum
                $scope.reference = window.location.href;

            $scope._user = _user.user; //Grapping the user from _user(service)

            /**
             *  Used to create new messages
             *  Should be reset if new message was created successfully
             */
            $scope.comment = {
                reference: $scope.reference,
                message: ""
            };

            /**
             *  Collects comments based on $scope.reference
             */
            $scope.comments = _comments.get_comments($scope.reference);

            /**
             *  Creates a new message based on $scop.comments
             *  This method uses _comments (service) to handle http request for backend
             */
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