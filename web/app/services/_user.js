var APP = angular.module('APP');
APP.service('_user', ['_http', function(_http) {

    this.user = {
        id: false
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
                _this.user = result.data.user;
                console.log(_this.user);
            })
    };

}]);