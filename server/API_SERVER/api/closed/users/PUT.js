module.exports = function(_request, _response) {
    _request.user.first_name = _request.body.first_name;
    _request.user.last_name = _request.body.last_name;
    _request.user.username = _request.body.username;

    if (_request.user.api.key && _request.body.api)
        _request.user.api.website = _request.body.api.website;

    _request.user.save()
        .then(function(result) {
            _response
                ._R
                ._SUCCESS("Your changes were saved")
                ._DATA("user", result.toOWNER())
                ._SEND();
        })
        .catch(function(err) {
            _response
                ._R
                ._ERROR("Unknown error")
                ._STATUS(500)
                ._SEND();
            console.trace(err);
        });
};