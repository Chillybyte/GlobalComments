/*_ASSIGN_ RE*/
var SCHEMA_USER = require(process.env.APP_SCHEMA_USER),

    passport = require("passport"),
    LocalStrategy = require('passport-local').Strategy;

module.exports = function() {
    
    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            SCHEMA_USER.findOne({
                email: email.toLowerCase()
            }, function(err, user) {
                if (err) {
                    done(err);
                } else {
                    if (user) {
                        if (user.compare_password(password)) {
                            done(null, user);
                        } else {
                            done("Username or password is incorrect");
                        }
                    } else {
                        done("Username or password is incorrect");
                    }
                }
            });

        }));

}