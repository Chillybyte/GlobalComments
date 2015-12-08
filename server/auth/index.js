/*_ASSIGN_ MSN*/
var mongoose = require("mongoose"),
    SCHEMA_USER = require(process.env.APP_SCHEMA_USER),
    passport = require("passport");

passport.serializeUser(function(user, done) {
    if (!user) {
        done("Not signed in", null);
    } else {
        done(null, user.get("id"));
    }
});

passport.deserializeUser(function(id, done) {
    SCHEMA_USER.findOne({
        _id: id
    }, function(err, body) {
        done(err, body);
    });
});

require("./strategies/local-signup.js")();
require("./strategies/local-login.js")();