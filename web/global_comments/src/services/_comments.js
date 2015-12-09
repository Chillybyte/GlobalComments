/*_ASSIGN_ MSN*/
var GLOBAL_COMMENTS = angular.module("GLOBAL_COMMENTS");
GLOBAL_COMMENTS.service("_comments", ["_http", "_user", function(_http, _user) {

    this.thread_comments = {};

/*
If any, this function fetches the comment list on a given object
*/

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

/*
creates a new object by taking the reference aka the object being commented on, and adding the
comment content to the list of comments that is associated with the referenced object.
*/


    this.new_comment = function(reference, message) {
        var _this = this;
        return _http.post("/api/closed/thread_comment/" + reference, {
                message: message
            })
            .then(function(result) {
                _this.thread_comments[reference].messages.push(result.data.message);
            });
    };

    /**
     * This will create a temporary variable of the comment about to be deleted,
     * and if something goes wrong later in the process of deleting the comment,
     * that will result in the catch function being triggered, the comment will be 
     * added to the array of comments again.
     */

    this.delete_a_comment = function(_id_to_delete, $index, reference) {
        var _this = this;
        console.log($index + ' THE INDEX');
        return _http.delete("/api/closed/comment/" + _id_to_delete)
            .then(function() {
                var tmp = _this.thread_comments;
                console.log(tmp + '   the temp');
                console.log(reference + ' the reference');
            })
            .catch(function(err) {
               _this.thread_comments.push(tmp);
            })
    };

}]);