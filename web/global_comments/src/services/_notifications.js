var GLOBAL_COMMENTS = angular.module("GLOBAL_COMMENTS");
GLOBAL_COMMENTS.service("_notifications", [function() {
    var _id_count = 0;

    var add_notification = function(message, type, id) {
        if (!id) {
            _id_count++;
            id = "no_id_" + _id_count;
        }
        _notifications.push({
            message: message,
            id: id,
            type: type
        });
    };

    var remove_notification = function(id) {
        var l = _notifications.length;
        for (var i = 0; i < l; i++) {
            if (_notifications[i].id === id) {
                _notifications.splice(i, 1);
                break;
            }
        }
    };

    var add_notifications = function(notifications) {
        var l = notifications.length;
        for (var i = 0; i < l; i++) {
            add_notification(notifications[i].message, notifications[i].type, notifications[i].id);
        }
    };

    var _notifications = [];
    this.notifications = _notifications;

    this.ERROR = function(message) {
        add_notification(message, "ERROR");
    };
    this.SUCCESS = function(message) {
        add_notification(message, "SUCCESS");
    };
    this.INFO = function(message) {
        add_notification(message, "INFO");
    };
    this.remove = function(notification) {
        remove_notification(notification.id);
    };
    this.handle_success = function(data) {
        if (data.data.notifications) {
            add_notifications(data.data.notifications);
        }
    };
    this.handle_error = function(data) {
        if (!data.data.notifications) {
            this.ERROR("Unknown error");
        } else {
            add_notifications(data.data.notifications);
        }
    };

}]);