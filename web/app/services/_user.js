var APP = angular.module('APP');
APP.service('_user', ['_http', function(_http) {

    this.user = {
        id: false
    };

    this.search_friends_result = [];

    this.is_email_valid = function(email) {
        var mailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return mailPattern.test(email);
    };

    this.sign_in = function(data) {
        var _this = this;
        return _http.get("/api/open/user", data)
            .then(function(result) {
                angular.copy(result.data.user, _this.user);
            });
    };

    this.create_user = function(data) {
        var _this = this;
        return _http.post('/api/open/user/', data)
            .then(function(result) {
                angular.copy(result.data.user, _this.user);
            });
    };

    this.sign_out = function() {
        return _http.get("/api/sign_out");
    };

    this.authenticate = function() {
        var _this = this;
        return _http.get("/api/open/user", null, {
                silent: true
            })
            .then(function(result) {
                angular.copy(result.data.user, _this.user);
            });
    };


    this.find_friends = function(query) {
        var _this = this;
        _http.get("/api/closed/friends/" + query, null, {
                silent: true
            })
            .then(function(result) {
                angular.copy(result.data.users, _this.search_friends_result);
                console.log(result.data.users);
            })
            .catch(function() {
                angular.copy([], _this.search_friends_result);
            })
    };

}]);