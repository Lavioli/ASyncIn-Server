const express = require('express');
const usersRouter = express.Router();
const passport = require('../config/passport');
const bcrypt = require('bcrypt');
const BearerStrategy = require('passport-http-bearer').Strategy;
import tokenGenerator from '../config/tokenGenerator';

const validateUser = require('./validators').validateUser;

const User = require('../models/user');

usersRouter
  .route('/')

  .get(passport.authenticate('bearer', { session: false }), (req, res) => {
    User.find()
       .select('username')
      .then(users => res.json(users))
      .catch(err => res.sendStatus(500));
  })

  .post((req, res) => {
    const validatorResponse = validateUser(req.body);
    if (validatorResponse.error) return res.status(validatorResponse.status).json(validatorResponse.body);

    User.createUser(
      req.body.username,
      req.body.password, 
      req.body.email,
      tokenGenerator(34)
    )
      .then(user => {
        res.set('Location', `/api/v1/users/${user.username}`);
        return res.status(201).json(user);
      })
      .catch(err => {
        console.error(err);
        if (err.status === 400) return res.status(400).json({ message: err.message });
        return res.sendStatus(500);
      });
  });

usersRouter
  .route('/:token')
  
  .get(passport.authenticate('bearer', { session: false }), (req, res) => {
    User.findOne({ token: req.params.token })
      .then(user => {
        if (!user) return res.status(404).json({ message: 'User not found' });
        if (req.query.access_token === user.accessToken){
            return res.json({username: user.username, accessToken: user.accessToken, playlists: user.playlists});
        } else {
            return res.json({username: user.username, playlists: user.playlists});  
        }
          
        })
      
      .catch(err => res.sendStatus(500));
  })

  .put(passport.authenticate('bearer', { session: false }), (req, res) => {
    const validatorResponse = validateUser(req.body);
    if (validatorResponse.error) return res.status(validatorResponse.status).json(validatorResponse.body);
    if (req.user.username !== req.params.username) return res.sendStatus(401);

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        User.findOneAndUpdate({ username: req.user.username }, { username: req.body.username, password: hash })
          .then(user => {
            if (!user) return res.status(404).json({ message: 'User not found' });
            return res.json({});
          })
          .catch(() => res.sendStatus(500));
      });
    });
  })

passport.use(
    new BearerStrategy(
        function(accessToken, done) {
            console.log('bearer strategy');
            User.findOne({
                    accessToken: accessToken,
                },
                function(err, user) {
                    console.log(user);
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

module.exports = usersRouter;
