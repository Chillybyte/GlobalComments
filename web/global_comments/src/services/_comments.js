var GLOBAL_COMMENTS = angular.module("GLOBAL_COMMENTS");
GLOBAL_COMMENTS.service("_comments", ["_http", "_user", function(_http, _user) {

    this.get_comments = function(reference) {
        var _this = this;
        if (_user.thread_comments[reference])
            return _user.thread_comments[reference];

        _user.thread_comments[reference] = [];

        _http.get("/global_comments/api/open/thread_comment/" + reference)
            .then(function(result) {
                angular.copy(result.data.thread, _user.thread_comments[reference]);
            });
        return _user.thread_comments[reference];
    };

    this.new_comment = function(reference, message) {
        var _this = this;
        return _http.post("/global_comments/api/closed/thread_comment/" + reference, {
                message: message
            })
            .then(function(result) {
                _user.thread_comments[reference].messages.push(result.data.message);
            });
    };

}]);