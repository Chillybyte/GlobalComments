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

            $scope.sign_up = function() {
                if (!$scope.new_user.username) {
                    _notifications.ERROR("Username is empty")
                } else if (!$scope.new_user.email || !_user.is_email_valid($scope.new_user.email)) {
                    _notifications.ERROR("'" + $scope.new_user.email + "'" + " is not a valid email");
                } else if (!$scope.new_user.password || $scope.new_user.password.length < 6) {
                    _notifications.ERROR("Password is too short")
                } else if (!$scope.new_user.repeat_password || $scope.new_user.repeat_password !== $scope.new_user.password) {
                    _notifications.ERROR("Passwords do not match")
                } else {
                    _user.create_user({
                        username: $scope.new_user.username,
                        first_name: $scope.new_user.first_name,
                        last_name: $scope.new_user.last_name,
                        email: $scope.new_user.email,
                        password: $scope.new_user.password,
                        repeat_password: $scope.new_user.repeat_password
                    })
                }
            }
        }]
    };

}]);