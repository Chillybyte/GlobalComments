/*_ASSIGN_ MSN*/
var GLOBAL_COMMENTS = angular.module("GLOBAL_COMMENTS");
GLOBAL_COMMENTS.service("_http", ["$http", "$q", "_notifications", function($http, $q, _notifications) {

    /**
     * This is the overall service to handle the connections that points to the API
     * in our backend. The CRUD functions themselves are generic in the sense that 
     * no matter if it is a comment or a user that is being create it uses the same 
     * functions to get to the backend API by having the relevant URL defining the 
     * type of object being created. the data whether it is the demanded data structure 
     * of a user with a username, email, first and last name and a password, or a comment 
     * with it's data structure. Last in the call is the possibility to send any options 
     * along with the call, that is to be used in CRUD function further down the line
     **/

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