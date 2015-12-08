/*_ASSIGN_ MSN*/
/**
 *  The purpose of this module is to authenticate users via passport
 */
var mongoose = require("mongoose"),
    SCHEMA_USER = require(process.env.APP_SCHEMA_USER),
    passport = require("passport");

/**
 *  Serializes the user and creates a cookieobject which
 *  can be deserialized later
 */
passport.serializeUser(function(user, done) {
    if (!user) {
        done("Not signed in", null);
    } else {
        done(null, user.get("id"));
    }
});

/**
 *  Finds the user related to the id
 *  If a use is found the request may use request.user to look into the user found
 */
passport.deserializeUser(function(id, done) {
    SCHEMA_USER.findOne({
        _id: id
    }, function(err, body) {
        done(err, body);
    });
});

require("./strategies/local-signup.js")();
require("./strategies/local-login.js")();