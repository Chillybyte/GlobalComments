/*ASSIGN_ RE; _ET; DO; MSN*/
var APP = angular.module("APP");

APP.config(["$locationProvider", "$stateProvider", "$urlRouterProvider", function($locationProvider, $stateProvider, $urlRouterProvider) {
    var _initialized = false;
    /**
     * Happens whenever the user navigates
     */
    $urlRouterProvider
        .when("/{path:.*}", ["_user", "$state", function(_user) {
            if (!_initialized) {
                _initialized = true;
                _user.authenticate();
            }
            return false; //Tell router that is has not yet resolved the path - Continue to $stateProvider
        }]);

    $stateProvider
        .state("index", {
            url: "/",
            controller: "indexController",
            templateUrl: "application/index/template.html",
            params: {
                contact: null
            }
        });

    $stateProvider
        .state("about", {
            url: "/about/",
            controller: "aboutController",
            templateUrl: "application/about/template.html",
            params: {
                contact: null
            }
        });

    $stateProvider
        .state("tryme", {
            url: "/tryme/",
            controller: "trymeController",
            templateUrl: "application/tryme/template.html",
            params: {
                contact: null
            }
        });


    $urlRouterProvider
        .otherwise(function() {
            alert("DOH! - This site does not exist!");
        });

    $locationProvider.html5Mode(true); //Removes the HASHTAG
}]);