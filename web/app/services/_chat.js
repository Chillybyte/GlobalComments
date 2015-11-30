var APP = angular.module("APP");
APP.service("_chat", ["_http", function(_http) {

    this.threads = {};

    this.new_conversation = function(user_id) {

    };

    this.add_person_to_conversation = function(thread_id, user_id) {

    };

    this.get_messages = function(thread_id) {
        var _this = this;
        if (_this.threads[thread_id])
            return _this.threads[thread_id];
        else
            _this.threads[thread_id] = [];

        _http.get("/api/open/thread_chat/" + thread_id)
            .then(function(result) {
                angular.copy(result.data.thread, _this.threads[thread_id]);
            });
        return _this.threads[thread_id];
    };

    this.new_message = function(thread_id, message) {
        var _this = this;
        return _http.post("/api/closed/thread_chat/" + thread_id, {
                message: message
            })
            .then(function(result) {
                _this.threads[thread_id].messages.push(result.data.message);
            });
    };

}]);