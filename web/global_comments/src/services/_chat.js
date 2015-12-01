var GLOBAL_COMMENTS = angular.module("GLOBAL_COMMENTS");
GLOBAL_COMMENTS.service("_chat", ["_http", "_user", function(_http, _user) {

    this.threads = {};

    this.add_person_to_conversation = function(thread_id, user_id) {

    };

    this.get_messages = function(user_ids) {
        var _this = this;
        if (!_user.user.id)
            return [];
        user_ids.push(_user.user.id);
        user_ids = user_ids.sort();
        var thread_id = Base64.encode(user_ids.join(""));

        if (_this.threads[thread_id])
            return _this.threads[thread_id];
        else
            _this.threads[thread_id] = [];

        _http.get("/api/closed/thread_chat/" + thread_id, {
                user_ids: user_ids
            })
            .then(function(result) {
                angular.copy(result.data.thread, _this.threads[thread_id]);
            });
        return _this.threads[thread_id];
    };

    this.new_message = function(user_ids, message) {
        var _this = this;
        if (!_user.user.id)
            return [];
        user_ids.push(_user.user.id);
        user_ids = user_ids.sort();
        var thread_id = Base64.encode(user_ids.join(""));
        return _http.post("/api/closed/thread_chat/" + thread_id, {
                message: message
            })
            .then(function(result) {
                _this.threads[thread_id].messages.push(result.data.message);
            });
    };

}]);