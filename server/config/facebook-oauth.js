import 'babel-polyfill';
import express from 'express';
import passport from 'passport';
import User from '../models/user';

const FacebookStrategy = require('passport-facebook').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const facebookRouter = express.Router();

var secrets;
    if (!process.env.CLIENT_ID) secrets = require('./client_secret');

facebookRouter.use(passport.initialize());
facebookRouter.use(passport.session());


passport.use(
    new FacebookStrategy({
        clientID: process.env.CLIENT_ID || secrets.facebook.client_id,
        clientSecret: process.env.CLIENT_SECRET || secrets.facebook.client_secret,
        callbackURL: process.env.CALL_BACK_URL || secrets.facebook.callbackURL
        },
        
        function(accessToken, refreshToken, profile, done) {
            console.log(accessToken);
            console.log(profile);
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
                    username: profile.displayName,
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

facebookRouter.get(
  '/',
    passport.authenticate('facebook', { session: false, scope: [] })
);

facebookRouter.get('/callback',
  passport.authenticate('facebook', { session: false, failureRedirect: "/login" }),
  function(req, res) {
    var accessToken = req.user.accessToken;
    res.redirect("/home?access_token=" + accessToken);
  }
);

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


module.exports = facebookRouter;