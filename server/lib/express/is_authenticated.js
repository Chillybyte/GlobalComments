/**
 *  This module is middleware intended for Express.
 *  The purpose of the middleware is to check if the requester is authenticated via passport module.
 *
 *	In case the requester is not authenticated he/she will not be granted access and a statuscode 401
 *	is sent back to the requester.
 *
 *	Otherwise the next middleware in line is executed and _request.user is accessable by any middleware
 *
 *	Only use this middle after all routes that need no authentication has been processed
 */
module.exports = function(_request, _response, _next) {
    if (_request.isAuthenticated())
        return _next();

    _response
        ._R
        ._STATUS(401)
        ._SEND();
}