var mongoose = require("mongoose"),
    DB_USERS = require(process.env.APP_DB_USERS),
    passport = require("passport");

passport.serializeUser(function(user, done) {
    if (!user) {
        done("Not signed in", null);
    } else {
        done(null, user.get("id"));
    }
});

passport.deserializeUser(function(id, done) {
    DB_USERS.findOne({
        _id: id
    }, function(err, body) {
        done(err, body);
    });
});

require("./strategies/local-signup.js")();
require("./strategies/local-login.js")();