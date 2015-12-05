var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    passport = require('passport'),
    mongoose = require('mongoose'),
    http = require('http'),
    mongoStore = require('connect-mongo')(session);


require('./config.js'); //SECRET HUSH HUSH FILE DO NOT SHARE
require('./settings.js');
require('./auth/index.js');

var mongo_url = process.env.APP_MONGOOSE_DRIVER +
    process.env.APP_MONGOOSE_HOST + ":" +
    process.env.APP_MONGOOSE_PORT +
    process.env.APP_MONGOOSE_DB;

/**
 *  Supplement to missing promises in mongoose 4.2.6
 */
mongoose.Promise = require('bluebird');
require('es6-promise').polyfill();

var mongoose = require("mongoose");
mongoose.connect(mongo_url);
var db = mongoose.connection;
db.once("open", function() {

    var sessionStore = new mongoStore({
        url: mongo_url,
        ttl: 14 * 24 * 60 * 60
    });

    app.use(cookieParser('secret'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(session({
        resave: false,
        saveUninitialized: false,
        key: process.env.APP_SERVER_KEY,
        secret: process.env.APP_SERVER_SECRET,
        cookie: {
            secure: false,
            expires: false,
        },
        store: sessionStore
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(require('./router.js'));

    //Socket creation and initialization
    var server = http.createServer(app);

    server.listen(8000, function() {
        var host = server.address().address;
        var port = server.address().port;
        console.log('Listening at http://%s:%s', host, port);
    });
});