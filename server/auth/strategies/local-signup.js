/*_ASSIGN_ ET*/
var SCHEMA_USER = require(process.env.APP_SCHEMA_USER),

    passport = require("passport"),
    LocalStrategy = require('passport-local').Strategy;

module.exports = function() {
    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(_request, email, password, done) {
            var user = new SCHEMA_USER(_request.body);
            user.verify_password(_request.body.password, _request.body.repeat_password, function(err) {
                if (!err) {
                    user.save(function(err, result) {
                        if (!err) {
                            done(null, result);
                        } else if (err.code === 11000 || err.code === 11001) { //Unique index already exists - In this case, the e-mail
                            done("'" + email + "'" + " already exists");
                        } else {
                            console.trace(err);
                            done(err);
                        }
                    });
                } else {
                    console.trace(err);
                    done(err);
                }
            });
        }));

};