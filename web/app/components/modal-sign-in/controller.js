/*_ASSIGN_ RE*/
var APP = angular.module("APP");
APP.directive("modalSignIn", [function() {
    return {
        replace: true,
        restrict: "E",
        templateUrl: "components/modal-sign-in/template.html",
        controller: ["$scope", "_user", "_notifications", function($scope, _user, _notifications) {

            /**
             *  These are the credentials for signing in
             *  These should be reset when a successful sign in was made
             */
            $scope.credentials = {
                email: "",
                password: "",
                remember_me: false
            };


            /**
             *  Signs the user in based on $scope.credentials which is fetched by ng-models
             *  in web/app/componenets/modal-sign-in/template.html
             *
             *  This uses _user (service) to handle the request for backend
             */
            $scope.local_sign_in = function() {
                if (!$scope.credentials.email || !_user.is_email_valid($scope.credentials.email)) {
                    _notifications.ERROR("'" + $scope.credentials.email + "' is an invalid email");
                } else if (!$scope.credentials.password || $scope.credentials.password.length < 6) {
                    _notifications.ERROR("Password is too short");
                } else {
                    _user.sign_in($scope.credentials)
                        .then(function() {
                            $scope.credentials = {
                                email: "", //May be username or e-mail
                                password: "",
                                remember_me: true
                            };
                            $("#modal-sign_in").modal("hide")
                        });
                }
            }
        }]
    };
}]);