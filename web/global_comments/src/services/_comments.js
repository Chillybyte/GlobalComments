var GLOBAL_COMMENTS = angular.module("GLOBAL_COMMENTS");
GLOBAL_COMMENTS.service("_comments", ["_http", function(_http) {

    this.threads = {};

    this.get_comments = function(reference) {
        var _this = this;
        if (_this.threads[reference])
            return _this.threads[reference];
        
        _this.threads[reference] = [];

        _http.get("/api/open/thread_comment/" + reference)
            .then(function(result) {
                angular.copy(result.data.thread, _this.threads[reference]);
            });
        return _this.threads[reference];
    };

    this.new_comment = function(reference, message) {
        var _this = this;
        return _http.post("/api/closed/thread_comment/" + reference, {
                message: message
            })
            .then(function(result) {
                _this.threads[reference].messages.push(result.data.message);
            });
    };

}]);