var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    passport = require('passport'),
    mongoose = require('mongoose');

require('./config.js'); //SECRET HUSH HUSH FILE DO NOT SHARE
require('./settings.js');
require('./auth/index.js');

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

    app.use(require('./router.js'));
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

    var server = app.listen(3000, function() {
        var host = server.address().address;
        var port = server.address().port;

        console.log('Listening at http://%s:%s', host, port);
    });
});