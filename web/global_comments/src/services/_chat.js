/*_ASSIGN_ DO*/

/* 
 * _chat is our service that allows us to get chat messages from our
 * back end and update our front with them.
*/
var GLOBAL_COMMENTS = angular.module("GLOBAL_COMMENTS");
GLOBAL_COMMENTS.service("_chat", ["_http", "_user", function(_http, _user) {

    this.thread_chats = {};

    this.get_messages = function(user_ids) {
        var _this = this;
        if (!_user.user.id)
            return [];
        user_ids = user_ids.sort();
        var thread_id = Base64.encode(user_ids.join(""));

        if (_this.thread_chats[thread_id])
            return _this.thread_chats[thread_id];
        else
            _this.thread_chats[thread_id] = [];

        _http.get("/api/closed/thread_chat/" + thread_id, {
                user_ids: user_ids
            })
            .then(function(result) {
                angular.copy(result.data.thread, _this.thread_chats[thread_id]);
            });
        return _this.thread_chats[thread_id];
    };

    this.new_message = function(user_ids, message) {
        var _this = this;
        if (!_user.user.id)
            return [];
        user_ids = user_ids.sort();
        var thread_id = Base64.encode(user_ids.join(""));
        return _http.post("/api/closed/thread_chat/" + thread_id, {
                message: message,
                user_id: user_ids
            })
            .then(function(result) {
                _this.thread_chats[thread_id].updated_at = result.data.updated_at;
                _this.thread_chats[thread_id].messages.push(result.data.message);
            });
    };

}]);