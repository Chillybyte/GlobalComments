var DB_USERS = require(process.env.APP_DB_USERS),

    passport = require("passport"),
    LocalStrategy = require('passport-local').Strategy;

module.exports = function() {
    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(_request, email, password, done) {
            var user = new DB_USERS(_request.body);
            user.verify_password(_request.body.password, _request.body.confirm_password, function(err) {
                if (!err) {
                    user.save(function(err, result) {
                        if (!err) {
                            done(null, result);
                        } else if (err.code === 11000 || err.code === 11001) { //Unique index already exists - In this case, the e-mail
                            done("E-mail already exists");
                        } else {
                            console.trace(err);
                            done(err);
                        }
                    });
                } else {
                    done(err);
                }
            });
        }));

};