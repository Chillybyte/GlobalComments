var request = require("request"),
    q = require("q");


function _request(method, url, headers, data) {

    var deferred = q.defer();
    if (!headers)
        headers = {};
    if (!data)
        data = {};

    var request_data = {};
    if (method === "GET") {
        request_data = {
            method: method,
            url: url,
            headers: headers,
            qs: data
        };
    } else {
        request_data = {
            method: method,
            url: url,
            headers: headers,
            json: data
        };
    };

    request(request_data, function(_error, _response, _result) {
        if (!_error) {
            deferred.resolve(_result);
        } else {
            deferred.reject(_error);
        }
    });
    return deferred.promise;

}


module.exports.get = function(url, headers, data) {
    return _request("GET", url, headers, data);
};

module.exports.post = function(url, headers, data) {
    return _request("POST", url, headers, data);
};

module.exports.put = function(url, headers, data) {
    return _request("PUT", url, headers, data);
};

module.exports.delete = function(url, headers, data) {
    return _request("DELETE", url, headers, data);
};

module.exports.patch = function(url, headers, data) {
    return _request("PATCH", url, headers, data);
};