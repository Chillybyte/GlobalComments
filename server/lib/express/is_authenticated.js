module.exports = function(_request, _response, _next) {
        if (_request.isAuthenticated())
        return _next();

    _response
        ._R
        ._STATUS(401)
        ._send();
}