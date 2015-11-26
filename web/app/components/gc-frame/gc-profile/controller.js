var APP = angular.module("APP");
APP.directive("gcProfile", [function() {
	
    return {
        replace: true,
        scope: true,
        restrict: "E",
        templateUrl: "components/gc-frame/gc-profile/template.html",
        controller: ['$scope', '_user', '_notifications', function($scope, _user, _notifications) {
			$scope.user = _user.user;
			$scope.editProfileIsHidden = true;
			
			$scope.edit_profile = function() {
				if (!$scope.user.username) {
					_notifications.ERROR("Username is empty");
				} else if (!$scope.user.first_name) {
					_notifications.ERROR("First name is empty");
				} else if (!$scope.user.last_name) {
					_notifications.ERROR("Last name is empty");
				} else {
					_user.update_user($scope.user, $scope.user.id);
				}
			}
			
			$scope.showHideEditProfile = function() {
				console.log($scope.editProfileIsHidden);
				if($scope.editProfileIsHidden) {
					$('.gc-profile-edit').show(200);
					$scope.editProfileIsHidden = false;
				} else {
					$scope.hideEditProfile();
				}
			}
			
			$scope.hideEditProfile = function() {
				$('.gc-profile-edit').hide(200);
				$scope.editProfileIsHidden = true;
			}
        }]
    };
	
}]);