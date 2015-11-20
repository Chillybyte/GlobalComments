var APP = angular.module('APP');
APP.directive('compTopbar', [function() {

    return {
        replace: true,
        restrict: 'E',
        templateUrl: 'components/comp-topbar/template.html',
        controller: ['$scope', '_user', '_notifications', function($scope, _user, _notifications) {
            $scope.user = _user.user;
            $scope.username = '';
            $scope.first_name = '';
            $scope.last_name = '';
            $scope.email = '';
            $scope.password = '';
            $scope.repeat_password = '';

            $scope.sign_up = function() {
                console.log($scope.username);
                if (!$scope.username) {
                    _notifications.ERROR("Username is empty")
                } else if (!$scope.email) {
                    _notifications.ERROR("email is empty")
                } else if (!$scope.password) {
                    _notifications.ERROR("password is empty")
                } else if (!$scope.repeat_password) {
                    _notifications.ERROR("Password repeated is empty")
                } else {
                    _user.create_user({
                        username: $scope.username,
                        first_name: $scope.first_name,
                        last_name: $scope.last_name,
                        email: $scope.email,
                        password: $scope.password,
                        repeat_password: $scope.repeat_password
                    })
                }
            }
        }]
    };

}]);