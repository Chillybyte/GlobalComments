var SCHEMA_USER = require(process.env.APP_SCHEMA_USER);
module.exports = function(_request, _response) {
    console.log(_request.params);
    var search = new RegExp(_request.params.query.replace(" ", "|"), "i")
    SCHEMA_USER.find({
            $or: [{
                username: search
            }, {
                first_name: search
            }, {
                last_name: search
            }, {
                email: search
            }]
        }, "first_name last_name username email updated_at created_at")
        .then(function(result) {
            _response
                ._R
                ._DATA("users", result)
                ._SEND();
        })
        .catch(function(err) {
            console.trace(err);
            _response
                ._R
                ._ERROR("Unknown error")
                ._SEND();
        });
};