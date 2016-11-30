'use strict';

var TokenStrategy   = require('passport-token').Strategy;


passport.use(new TokenStrategy({
    usernameHeader: 'x-custom-username',
    tokenHeader:    'x-custom-token',        
    usernameField:  'custom-username',
    tokenField:     'custom-token'
},
    function (username, token, done) {
        User.findOne({username: username}, function (err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false);
            }

            if (!user.verifyToken(token)) {
                return done(null, false);
            }

            return done(null, user);
        });
    }