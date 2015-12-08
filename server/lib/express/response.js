var uuid = require("uuid");
/**
 *  This module is middleware intended for Express.
 *  The purpose of the middleware is to generate a very strict way to pass data between server and client
 *  
 *  The data that is sent may vary a great deal, but the messages sent back are always one of three types
 *  ERROR, INFO and/or SUCCESS
 *
 *  Example of usage:
 *      var express = require('express');
 *      var router = express.Router();
 *  
 *      router.use(require(./response.js));
 *      module.exports = router;
 *
 *  It is important to use this middleware before any response is to be sent back
 */
module.exports = function(_request, _response, _next) {
    _response._R = new function() {
        var _response_ = _response;

        var _this = this;

        var MESSAGES = [];

        var RESPONSE = {
            "notifications": MESSAGES,
        };


        /**
         *  Attaches an error to the response
         *
         *  @msg: The actual message to be sent
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
         *  Attaches an information message to the response
         *
         *  @msg: The actual message to be sent
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
         *  Attaches a success message to the response
         *
         *  @msg: The actual message to be sent
         */
        _this._SUCCESS = function(msg) {
            MESSAGES.push({
                id: uuid.v1() + uuid.v4(),
                message: msg,
                type: "SUCCESS"
            });
            return _this;
        };

        /**
         *  Add a header to the response
         *
         *  @kea: Type of header to add to the response
         *
         *  @value: The value of the header to be added to the response
         *
         *  Ex: _R._HEADER("Content-Type", "application/json")
         */
        _this._HEADER = function(key, value) {
            _response_.setHeader(key, value);
            return _this;
        };

        /**
         *  Adds a key/value pair object to the response in JSON format
         *
         *  @key: The key of the object
         *  
         *  @object: The value of the key
         *
         *  Ex: _R._DATA("user", { first_name: "John", last_name: "Doe", _id: "123456789"})
         */
        _this._DATA = function(key, object) {
            RESPONSE[key] = object;
            return _this;
        };

        /**
         *  Sets the status code of the response in case of File Not Found(404), Not authorized(401), internal error(500) etc.
         *  
         *  @statusCode: The actual status code
         *  
         *  Ex: _R._DATA(200)
         */
        _this._STATUS = function(statusCode) {
            _response_.status(statusCode);
            return _this;
        };

        /**
         *  Sends the built response to the requester
         */
        _this._SEND = function() {
            _response_
                .send(RESPONSE);
        }
    }
    _next();
}