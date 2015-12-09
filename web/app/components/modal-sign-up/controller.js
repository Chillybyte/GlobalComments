/*_ASSIGN_ RE*/
var APP = angular.module("APP");
APP.directive("modalSignUp", [function() {
    return {
        replace: true,
        restrict: "E",
        templateUrl: "components/modal-sign-up/template.html",
        controller: ["$scope", "_user", "_notifications", function($scope, _user, _notifications) {

            /**
             *  Values for creating a new profile
             *  These should be reset when a successful creation of a user
             *  is made
             */
            $scope.new_user = {
                username: "",
                first_name: "",
                last_name: "",
                email: "",
                password: "",
                repeat_password: ""
            };

            /**
             *  Signs the user up based on $scope.new_user object which is fetched by ng-models
             *  in web/app/componenets/model-sign-up/template.html
             *
             *  This uses _user (service) to handle the request for backend
             */
            $scope.sign_up = function() {
                if (!$scope.new_user.username) {
                    _notifications.ERROR("Username is empty");
                } else if (!$scope.new_user.email || !_user.is_email_valid($scope.new_user.email)) {
                    _notifications.ERROR("'" + $scope.new_user.email + "'" + " is not a valid email");
                } else if (!$scope.new_user.password || $scope.new_user.password.length < 6) {
                    _notifications.ERROR("Password is too short");
                } else if (!$scope.new_user.repeat_password || $scope.new_user.repeat_password !== $scope.new_user.password) {
                    _notifications.ERROR("Passwords do not match");
                } else {
                    _user.create_user($scope.new_user)
                        .then(function() {
                            $scope.new_user = {
                                username: "",
                                first_name: "",
                                last_name: "",
                                email: "",
                                password: "",
                                repeat_password: ""
                            }
                        });
                }
            };

        }]
    };
}]);