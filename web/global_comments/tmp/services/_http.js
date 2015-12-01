var GLOBAL_COMMENTS = angular.module("GLOBAL_COMMENTS");
GLOBAL_COMMENTS.service("_http", ["$http", "$q", "_notifications", function($http, $q, _notifications) {

    /**
     * @url     - Path to backend API
     * @method  - What method should be applied? (POST, GET, DELETE, PUT, PATCH)
     * @data    - JavaScript Object with data to send to backend
     * @options - JavaScript Object with options
     *              {
     *                  silent: true/false - Should _http show notifications from backend?
     *              }
     */

    this.request = function(url, method, data, options) {
        var _this = this;
        var deferred = $q.defer();
        _this.count++;

        if (!options)
            options = {};

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
                if (!options.silent)
                    _notifications.handle_success(result);
            })
            .catch(function(error) {
                deferred.reject(error);
                if (!options.silent)
                    _notifications.handle_error(error);
            })
            .finally(function() {
                if (_this.count > 0)
                    _this.count--;
            });
        return deferred.promise;
    };

    this.count = 0; //Determines if any async request is active - Look at comp-topbar
    this.post = function(url, data, options) {
        return this.request(url, "POST", data, options);
    };
    this.get = function(url, data, options) {
        return this.request(url, "GET", data, options);
    };
    this.delete = function(url, data, options) {
        return this.request(url, "DELETE", data, options);
    };
    this.put = function(url, data, options) {
        return this.request(url, "PUT", data, options);
    };
    this.patch = function(url, data, options) {
        return this.request(url, "PATCH", data, options);
    };

}]);