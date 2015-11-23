var APP = angular.module('APP');
APP.service('_user', ['_http', function(_http) {

    this.user = {
        id: false
    };

    this.is_email_valid = function(email) {
        var mailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return mailPattern.test(email);
    };
    /*
        this.get_user = function(data) {
            var _this = this;

            if (!this.user) {
                _http.get('/api/open/user/', data);
            } else return this.user;
        };
    */
    this.create_user = function(data) {
        var _this = this;
        _http.post('/api/open/user/', data)
            .then(function(result) {
                angular.copy(result.data.user, _this.user);
            });
    };

}]);