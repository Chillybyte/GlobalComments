var APP = angular.module("APP");
APP.service("_comments", ["_http", function(_http) {

    this.threads = {};

    this.comments = function(reference) {
        var _this = this;
        if (!_this.threads[reference]) {
            _this.threads[reference] = [];
        }
        _http.get("/api/open/threads/" + reference)
            .then(function(result) {
                angular.copy(result.data.thread, _this.threads[reference]);
            });
        return _this.threads[reference];
    };

    this.new_comment = function(reference, message) {
        var _this = this;
        return _http.post("/api/closed/comments/" + reference, {
                message: message
            })
            .then(function(result) {
                _this.threads[reference].messages.push(result.data.message);
            });
    };

}]);