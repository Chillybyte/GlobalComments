var APP_SCHEMA_USER = require(process.env.APP_SCHEMA_USER),
	SCHEMA_THREAD_COMMENT = require(process.env.APP_SCHEMA_THREAD_COMMENT),
    SCHEMA_MESSAGE = require(process.env.APP_SCHEMA_MESSAGE);

module.exports = function(_request, _response) {
    console.log(_request.params.delete + '  inside DELETE.js on the server side');

    	SCHEMA_THREAD_COMMENT.findOne({
    		_id: _request.params.delete
    	})
    	.then(function(message) {
    		console.log(message);
    		
    	});



};