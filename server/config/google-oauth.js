import 'babel-polyfill';
import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import User from '../models/user';

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const jsonParser = bodyParser.json();
const googleRouter = express.Router();

var secrets;
    if (!process.env.CLIENT_ID) secrets = require('./client_secret');

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
        clientID: process.env.CLIENT_ID || secrets.google.client_id,
        clientSecret: process.env.CLIENT_SECRET || secrets.google.client_secret,
        callbackURL: process.env.CALL_BACK_URL || secrets.google.callbackURL,
        passReqToCallback: true
    },

    function(request, accessToken, refreshToken, profile, done) {
        User.findOne({
            thirdPartyToken: profile.id
        }, function(err, user) {
           
            if (err) {
                done(err);
            }
            if (user) {
                console.log(user._id,'acctoken',accessToken);
                user.accessToken = accessToken;
                user.save(function(err){
                    return done(err, user);
                })
            }
            else {
                const newUser = new User({
                    username: profile.emails[0].value.slice(0, profile.emails[0].value.indexOf('@')),
                    accessToken: accessToken,
                    thirdPartyToken: profile.id
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
		var redirectLink = '/home?auth=' + accessToken;
		res.redirect(redirectLink);
	}
);


//token auth setup
passport.use(
    new BearerStrategy(
        function(token, done) {
            User.findOne({
                    access_token: token
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

module.exports = googleRouter;