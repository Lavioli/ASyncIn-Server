import 'babel-polyfill';
import express from 'express';
import passport from 'passport';
import User from '../models/user';

import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
import {Strategy as BearerStrategy} from 'passport-http-bearer';
const googleRouter = express.Router();


googleRouter.use(passport.initialize());
googleRouter.use(passport.session());

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CLIENT_CALLBACK_URL,
        passReqToCallback: true
    },

    function(request, accessToken, refreshToken, profile, done) {
        User.findOne({
            token: profile.id
        }, function(err, user) {
           
            if (err) {
                done(err);
            }
            if (user) {
                user.accessToken = accessToken;
                
                user.save(function(err){
                    return done(err, user);
                });
            }
            else {
                const newUser = new User({
                    username: profile.emails[0].value.slice(0, profile.emails[0].value.indexOf('@')),
                    accessToken: accessToken,
                    token: profile.id
                });
                
                newUser.save(function(err, res) {
                    if (err) return done(err, res);
                    return done(null, newUser);
                });
            }

        });

    }
));

googleRouter.get('/', passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/userinfo.profile','https://www.googleapis.com/auth/userinfo.email'], session: false}));

googleRouter.get('/callback', passport.authenticate('google', {failureRedirect: '/login', session: false}),
	function(req, res) {
		//successful authentication, redirect home
		var accessToken = req.user.accessToken;
		var redirectLink = 'https://lavioli.github.io/ASyncIn-Client/welcome?access_token=' + accessToken;
		res.redirect(redirectLink);
	}
);


//token auth setup
passport.use(
    new BearerStrategy(
        function(token, done) {
            User.findOne({
                    accessToken: token
                },
                function(err, user) {
                    if (err) {
                        return done(err)
                    }
                    if (!user) {
                        return done(null, false)
                    }

                    return done(null, user, {
                        scope: 'all'
                    })
                }
            );
        }
    )
);

export default googleRouter;