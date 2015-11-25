var APP = angular.module('APP');
APP.directive('compTopbar', [function() {

    return {
        replace: true,
        restrict: 'E',
        templateUrl: 'components/comp-topbar/template.html',
        controller: ['$scope', '_user', '_notifications', function($scope, _user, _notifications) {
            $scope.user = _user.user;

            $scope.new_user = {
                username: "",
                first_name: "",
                last_name: "",
                email: "",
                password: "",
                repeat_password: ""
            };

            $scope.credentials = {
                email: "",
                password: "",
                remember_me: true
            };

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

            $scope.sign_in = function() {
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
                            }
                        });
                }
            };

            $scope.sign_out = function() {
                _user.sign_out()
                    .then(function() {
                        _notifications.SUCCESS("You were successfully signed out");
                        window.location = "";
                    })
                    .catch(function() {
                        _notifications.ERROR("Failed to sign you out");
                    });
            };
        }]
    };

}]);