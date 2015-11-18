angular.module('app', [])
.directive('compTopbar', [function() {

	return {
		replace: true,
		restrict: "E",
		templateUrl: "components/comp-topbar/template.html",
		controller: ['$scope', function($scope) {

		}]
	};

}]);