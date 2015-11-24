var APP = angular.module("APP");
APP.controller("aboutController", ["$scope", "_http", function($scope, _http) {
    $scope.git_log = [];

    _http.get("//api.github.com/repos/Chillybyte/GlobalComments/commits", null, {
            silent: true
        })
        .then(function(result) {
            $scope.git_log = result.data;
            console.log(result);
        })
        .catch(function(err) {
            $scope.git_log = [];
            console.trace(err);
        });
}]);