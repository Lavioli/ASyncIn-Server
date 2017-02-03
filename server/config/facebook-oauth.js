import express from 'express';
import passport from 'passport';
import User from '../models/user';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
const facebookRouter = express.Router();

facebookRouter.use(passport.initialize());
facebookRouter.use(passport.session());


passport.use(
    new FacebookStrategy({
        clientID: process.env.FACEBOOK_CLIENT_ID ,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CLIENT_CALLBACK_URL
        },
        
        (accessToken, refreshToken, profile, done) => {
            User.findOne({
            token: profile.id
        }, (err, user) => {
           
            if (err) {
                done(err);
            }
            if (user) {
                user.accessToken = accessToken;
                user.save((err) => {
                    return done(err, user);
                })
            }
            else {
                const newUser = new User({
                    username: profile.displayName,
                    accessToken: accessToken,
                    token: profile.id
                });
                newUser.save((err, res) => {
                    if (err) return done(err, res);
                    return done(null, newUser);
                });
            }

        });
        }
    ));

facebookRouter.get(
  '/',
    passport.authenticate('facebook', { session: false, scope: ['email'] })
);

facebookRouter.get('/callback',
  passport.authenticate('facebook', { session: false, failureRedirect: "/login" }),
  (req, res) => {
    let accessToken = req.user.accessToken,
        token = req.user.token,
        redirectLink = 'https://kevl927.github.io/ASyncIn-Client/#/dashboard?access_token=' + accessToken + '&token=' + token;
	res.redirect(redirectLink);
  }
);

passport.use(
    new BearerStrategy(
        (token, done) => {
            User.findOne({
                    accessToken: token
                },
                (err, user) => {
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


export default facebookRouter;