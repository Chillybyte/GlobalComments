/*_ASSIGN_ ET*/
var uuid = require("uuid");
module.exports = function(_request, _response, _next) {
    _response._R = new function() {
        var _response_ = _response;

        var _this = this;

        var MESSAGES = [];

        var RESPONSE = {
            "notifications": MESSAGES,
        };


        /**
         * Attach an error to response 
         */
        _this._ERROR = function(msg) {
            if (typeof msg === "string") {
                MESSAGES.push({
                    id: uuid.v1() + uuid.v4(),
                    message: msg,
                    type: "ERROR"
                });
            } else if (typeof msg === "object") {
                for (var key in msg.errors) {
                    if (msg.errors.hasOwnProperty(key)) {
                        MESSAGES.push({
                            id: uuid.v1() + uuid.v4(),
                            message: msg.errors[key].message || "Unknown error",
                            type: "ERROR"
                        });
                    }
                }
            } else {
                MESSAGES.push({
                    id: uuid.v1() + uuid.v4(),
                    message: "Unknown error",
                    type: "ERROR"
                });
            }
            return _this;
        };

        /**
         * Attach an information message to response
         */ 
        _this._INFO = function(msg) {
            MESSAGES.push({
                id: uuid.v1() + uuid.v4(),
                message: msg,
                type: "INFO"
            });
            return _this;
        };
        
        /**
         * Attach an success info message to response
         */
        _this._SUCCESS = function(msg) {
            MESSAGES.push({
                id: uuid.v1() + uuid.v4(),
                message: msg,
                type: "SUCCESS"
            });
            return _this;
        };

        _this._HEADER = function(key, value) {
            _response_.setHeader(key, value);
            return _this;
        };
        
        _this._DATA = function(key, object) {
            RESPONSE[key] = object;
            return _this;
        };

        _this._STATUS = function(statusCode) {
            _response_.status(statusCode);
            return _this;
        };


        _this._SEND = function() {
            _response_
                .send(RESPONSE);
        }
    }
    _next();
}