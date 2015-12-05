var request = require("request"),
    bodyParser = require("body-parser");

require("./config.js");
/**
 * 	Initialize global_comments plugin for any NodeJS server
 *	It is expected that the server is powered by Express
 *
 *	@server: 	The actual server the webserver is running, this will be used for extending their own API
 *				and to extend functionality with sockets
 *
 *	@app: 		The app that was built to handle routes by express
 */
module.exports = function(server, app, API_KEY) {
    app.use("/global_comments/*", function(_request, _response) {
        console.log(process.env.GC_APP_BASE_SERVER + _request.originalUrl.replace("/global_comments/", ""));
        _request.pipe(request(process.env.GC_APP_BASE_SERVER + _request.originalUrl.replace("/global_comments/", ""))).pipe(_response);
    });
    app.use(bodyParser());
    app.use("/global_comments_callback", require("./callbacks"));
    require("./socket")(server, API_KEY);
};