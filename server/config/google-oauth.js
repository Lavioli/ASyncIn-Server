import express from 'express';
import passport from 'passport';
import User from '../models/user';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
const googleRouter = express.Router();

googleRouter.use(passport.initialize());
googleRouter.use(passport.session());

// used to serialize the user for the session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser((id, done) =>  {
    User.findById(id, (err, user) =>  {
        done(err, user);
    });
});

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CLIENT_CALLBACK_URL,
        passReqToCallback: true
    },

    (request, accessToken, refreshToken, profile, done) => {
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
                });
            }
            else {
                const newUser = new User({
                    username: profile.emails[0].value.slice(0, profile.emails[0].value.indexOf('@')),
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

googleRouter.get('/', passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/userinfo.profile','https://www.googleapis.com/auth/userinfo.email'], session: false}));

googleRouter.get('/callback', passport.authenticate('google', {failureRedirect: '/login', session: false}),
	(req, res) => {
		//successful authentication, redirect home
		let accessToken = req.user.accessToken,
		    token = req.user.token,
		    redirectLink = process.env.DASHBOARD_REDIRECT_LINK + accessToken + '&token=' + token;
		res.redirect(redirectLink);
	}
);

//token auth setup
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

export default googleRouter;