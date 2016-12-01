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
  })
  
  //Change username or password
  //If the user wants to change username,currentUsername and newUsername will be sent to us in JSON format and accessToken via query
  //If the user wants to change the password, current and new password will be sent to us in JSON format and accessToken via query
  //If the user wants to change the playlist send the updated playlist in JSON format and accessToken via query.
  .put(passport.authenticate('bearer', { session: false }), (req, res) => {
    
    if(req.body.currentUsername && req.body.newUsername){
      if(req.body.currentUsername === req.body.newUsername) {
        return res.json({Message: "New username is same as the current username"});
      }
    }
    
    if(req.body.newUsername) {
      User.findOneAndUpdate({accessToken: req.query.access_token }, { username: req.body.newUsername } , { new: true })
       .then(user => {
            if (!user) return res.status(404).json({ message: 'User not found' });
            return res.json(user);
       })
          .catch(() => res.sendStatus(500));
    }
    
    if(req.body.newPassword) {
       User.findOne({ accessToken: req.query.access_token },function(err, user){ 
        bcrypt.genSalt(10, (err, salt) => {
                      bcrypt.hash(req.body.newPassword, salt, (err, hashNewPassword) => {
                        console.log('hashNewPassword',hashNewPassword);
                      User.findOneAndUpdate({ accessToken: req.query.access_token }, {password: hashNewPassword }, { new: true })
                      .then(user => {
                        if (!user) return res.status(404).json({ message: 'User not found' });
                          return res.json({});
                      })
                    .catch(() => res.sendStatus(500));
            });
        });
      });
    }
    
    if(req.body.newPlaylists) {
      User.findOneAndUpdate({ accessToken: req.query.access_token }, { playlists: req.body.newPlaylists }, { new:true })
        .then(user => {
          if (!user) return res.status(404).json({ message: 'User not found' });
            return res.json(user);
        });
    }
    
   if(!req.body.newUsername && !req.body.newPassword && !req.body.newPlaylists) {
      return res.status(404).json({ message: 'Invalid input' });
   }
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
