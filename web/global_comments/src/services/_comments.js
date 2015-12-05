var GLOBAL_COMMENTS = angular.module("GLOBAL_COMMENTS");
GLOBAL_COMMENTS.service("_comments", ["_http", "_user", function(_http, _user) {

    this.thread_comments = {};

    this.get_comments = function(reference) {
        var _this = this;
        if (_this.thread_comments[reference])
            return _this.thread_comments[reference];

        _this.thread_comments[reference] = [];

        _http.get("/api/open/thread_comment/" + reference)
            .then(function(result) {
                angular.copy(result.data.thread, _this.thread_comments[reference]);
            });
        return _this.thread_comments[reference];
    };

    this.new_comment = function(reference, message) {
        var _this = this;
        return _http.post("/api/closed/thread_comment/" + reference, {
                message: message
            })
            .then(function(result) {
                _this.thread_comments[reference].messages.push(result.data.message);
            });
    };

    this.delete_a_comment = function(_id_to_delete, user_id) {
        var _this = this;
        return _http.delete("/api/closed/comment/" + _id_to_delete + "/" + _user.user.id)
        .then(function() {
            console.log("SHOULD BE DELETED ")
        });  
    };

}]);