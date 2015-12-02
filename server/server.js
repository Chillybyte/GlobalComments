var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    passport = require('passport'),
    mongoose = require('mongoose'),
    http = require('http'),
    socket = require('./socket.js');



require('./config.js'); //SECRET HUSH HUSH FILE DO NOT SHARE
require('./settings.js');
require('./auth/index.js');
require('./socket.js');

/**
 *  Supplement to missing promises in mongoose 4.2.6
 */
mongoose.Promise = require('bluebird');
require('es6-promise').polyfill();

var mongoose = require("mongoose");
mongoose.connect(
    process.env.APP_MONGOOSE_DRIVER +
    //    process.env.APP_MONGOOSE_USER + ":" +
    //    process.env.APP_MONGOOSE_PASSWORD + "@" +
    process.env.APP_MONGOOSE_HOST + ":" +
    process.env.APP_MONGOOSE_PORT +
    process.env.APP_MONGOOSE_DB);
var db = mongoose.connection;
db.once("open", function() {

    app.use(cookieParser('secret'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.APP_SERVER_SECRET,
        cookie: {
            secure: false,
            expires: false,
        }
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(require('./router.js'));
    var server = http.createServer(app);
    socket(server);

    server.listen(3000, function() {
        var host = server.address().address;
        var port = server.address().port;
        console.log('Listening at http://%s:%s', host, port);
    });
});