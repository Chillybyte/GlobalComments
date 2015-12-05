var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app);

require('./settings.js');
require("./global_comments")(server, app, "cda9fca0-9a32-11e5-919a-ef23e37ba161");
app.use(require('./router.js'));
server.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Listening at http://%s:%s', host, port);
});