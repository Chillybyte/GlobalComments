var GLOBAL_COMMENTS = angular.module("GLOBAL_COMMENTS");
GLOBAL_COMMENTS.service("_comments", ["_http", "_user", function(_http, _user) {

    this.get_comments = function(reference) {
        var _this = this;
        if (_user.thread_comments[reference])
            return _user.thread_comments[reference];

        _user.thread_comments[reference] = [];

        _http.get("/api/open/thread_comment/" + reference)
            .then(function(result) {
                angular.copy(result.data.thread, _user.thread_comments[reference]);
            });
        return _user.thread_comments[reference];
    };

    this.new_comment = function(reference, message) {
        var _this = this;
        return _http.post("/api/closed/thread_comment/" + reference, {
                message: message
            })
            .then(function(result) {
                _user.thread_comments[reference].messages.push(result.data.message);
            });
    };

    this.delete_a_comment = function(_id_to_delete) {
        var _this = this;
        console.log(_id_to_delete + ' inside the angular service');
        console.log("/api/closed/comment/" + _id_to_delete);
        return _http.delete("/api/closed/comment/" + _id_to_delete)
        .then(function() {
            console.log("SHOULD BE DELETED ")
        });  
    };

}]);