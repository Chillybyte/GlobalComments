var APP = angular.module("APP");
APP.service("_http", ["$http", "$q", "_notifications", function($http, $q, _notifications) {

    this.request = function(url, method, data) {
        var _this = this;
        var deferred = $q.defer();
        _this.count++;

        var http_object = {
            url: url,
            method: method
        };
        if (method === "GET")
            http_object.params = data;
        else
            http_object.data = data;

        $http(http_object)
            .then(function(result) {
                deferred.resolve(result);
                _notifications.handle_success(result);
            })
            .catch(function(error) {
                deferred.reject(error);
                _notifications.handle_error(error);
            })
            .finally(function() {
                if (_this.count > 0)
                    _this.count--;
            });
        return deferred.promise;
    };

    this.count = 0; //Determines if any async request is active - Look at comp-topbar
    this.post = function(url, data) {
        return this.request(url, "POST", data);
    };
    this.get = function(url, data) {
        return this.request(url, "GET", data);
    };
    this.delete = function(url, data) {
        return this.request(url, "DELETE", data);
    };
    this.put = function(url, data) {
        return this.request(url, "PUT", data);
    };
    this.patch = function(url, data) {
        return this.request(url, "PATCH", data);
    };
}]);