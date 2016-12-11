import express from 'express';
import passport from '../config/passport';
import bcrypt from 'bcrypt';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import tokenGenerator from '../config/tokenGenerator';
import User from '../models/user';
import Playlist from '../models/playlist';
const usersRouter = express.Router();

function userResponse(user) {
  return {
      username: user.username,
      token: user.token,
      accessToken: user.accessToken,
      userId: user._id,
      favouritePlaylists: user.favouritePlaylists,
      queue: user.queue
  };
}

usersRouter
  .route('/')
  .get(passport.authenticate('bearer', {session: false}), (req, res) => {
    User.find({},'username accessToken token _id favouritePlaylists queue')
      .then(users => {
            return res.json(users);
        })
        .catch(err => res.sendStatus(500));
  })
  .post((req, res) => {
    if (!req.body.username || !req.body.password || !req.body.email) {
        return res.status(400).json({ message: 'Invalid input.' });
    }
    User.createUser(
      req.body.username,
      req.body.password,
      req.body.email,
      tokenGenerator(34)
    )
    .then(user => {
        res.set('Location', `/api/v1/users/${user.username}`);
        Playlist.find({ _id: { $in: user.favouritePlaylists }}).then(favouritePlaylist =>{ 
             return res.status(201).json({user:{ username:user.username, 
                 token: user.token, 
                 accessToken: user.accessToken, 
                 userId: user._id,
                favouritePlaylists: favouritePlaylist}, playlist: []});
             })
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
  .put(passport.authenticate('bearer', {session: false}), (req, res) => {
      if(req.body.currentUsername && req.body.newUsername){
        if(req.body.currentUsername === req.body.newUsername) {
          return res.json({message: 'New username is same as the current username.'});
        }
      }
      if(req.body.newUsername) {
        User.findOneAndUpdate(
          {accessToken: req.query.access_token},
          { username: req.body.newUsername }, 
          { new: true }
        )
        .then(user => {
            if (!user) return res.status(404).json({message: 'User not found.'});
              Playlist.find({ _id: { $in: [user.favouritePlaylists] }}).then(favouritePlaylist =>{
                  return res.json({ username:user.username, 
                   token: user.token, 
                   accessToken: user.accessToken, 
                   userId: user._id,
                   favouritePlaylists: favouritePlaylist});
             })
        })
        .catch(() => res.sendStatus(500));
      }
      if(req.body.newPassword && req.body.oldPassword) {
        User.findOne({ accessToken: req.query.access_token },
          function(err, user){ 
            bcrypt.compare(req.body.oldPassword, user.password, (err, isValid) => {
              
            if (!isValid) return res.json({message: 'Incorrect password'});
            if (isValid){
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(req.body.newPassword, salt, 
                (err, hashNewPassword) => {
                  User.findOneAndUpdate(
                    {accessToken: req.query.access_token}, 
                    {password: hashNewPassword }, 
                    {new: true}
                  )
                  .then(user => {
                    if (!user) return res.status(404).json({ message: 'User not found.' });
                      return res.json({message: 'Your password has been changed successfully.'});
                  })
                  .catch(() => res.sendStatus(500));
                }
              );
            });
          }
        });
      });
      }
     if(!req.body.newUsername && !req.body.newPassword) {
        return res.status(404).json({ message: 'Invalid input' });
     }
    });


usersRouter
  .route('/:token')
  .get(passport.authenticate('bearer', { session: false }), (req, res) => {
    User.findOne(
      { token: req.params.token }
    )
    .then(user => {
      if (!user) return res.status(404).json({ message: 'User not found' });
      if (req.query.access_token === user.accessToken) {
          Playlist.find({ userId: user._id }).sort({createdDate: 'desc'}).then(playlist => {
              Playlist.find({ _id: { $in: user.favouritePlaylists }}).then(favouritePlaylist =>{ 
                 return res.json({user:{ username:user.username, 
                   token: user.token, 
                   accessToken: user.accessToken, 
                   userId: user._id,
                   favouritePlaylists: favouritePlaylist}, playlist: playlist});
             })
          });
      } else {
        //The else statement runs when an user checks out another user's playlist
        Playlist.find(
          { userId: user._id, isPublic: true }
        )
        .sort({createdDate: 'desc'})
        .then(playlist => {
            return res.json({
                username: user.username,
                userId: user._id,
                playlist: playlist
            });
        });
      }
    })
    .catch(err => res.sendStatus(500));
  })

  //when user selects a playlist to be added or to be deleted from his favouritePlaylist array
  //playlist id and rating should be supplied in req.body
  .put(passport.authenticate('bearer', { session: false }), (req, res) => {
    User.findOne(
      { token: req.params.token }
    )
    .then(user => {
        if (!user) return res.status(404).json({ message: 'User not found' });
        if (user.favouritePlaylists.indexOf(req.body.playlistId) === -1 && (req.body.rating)) {
          let newRating = req.body.rating + 1;
          const newFavouritePlaylist = user.favouritePlaylists;
          newFavouritePlaylist.push(req.body.playlistId);
          User.findOneAndUpdate(
            { token: req.params.token }, 
            { favouritePlaylists: newFavouritePlaylist }, 
            { new: true }
          )
          .then(user => {
            Playlist.findOneAndUpdate(
              { _id: req.body.playlistId }, 
              { rating: newRating }, 
              { new: true }
            )
            .sort({createdDate: 'desc'})
            .then(playlist => {
              Playlist.find({ _id: { $in: user.favouritePlaylists }}).then(favouritePlaylist =>{ 
                         return res.json({user:{ username:user.username, 
                           token: user.token, 
                           accessToken: user.accessToken, 
                           userId: user._id,
                           favouritePlaylists: favouritePlaylist}, playlist: playlist});
                       })
            });
          });
        } else {
          let newRating = req.body.rating - 1;
          const newFavouritePlaylist = user.favouritePlaylists;
          newFavouritePlaylist.splice(user.favouritePlaylists.indexOf(req.body.playlistId), 1);
          User.findOneAndUpdate(
            { token: req.params.token }, 
            { favouritePlaylists: newFavouritePlaylist }, 
            { new: true }
          )
          .then(user => {
            Playlist.findOneAndUpdate(
              { _id: req.body.playlistId }, 
              { rating: newRating }, 
              { new: true }
            )
            .sort({createdDate: 'desc'})
            .then(playlist => {
                Playlist.find({ _id: { $in: user.favouritePlaylists }}).then(favouritePlaylist =>{ 
                         return res.json({user:{ username:user.username, 
                           token: user.token, 
                           accessToken: user.accessToken, 
                           userId: user._id,
                           favouritePlaylists: favouritePlaylist}, playlist: playlist});
                      })
            });
          });
        }
    })
    .catch(err => res.sendStatus(500));
  });

usersRouter
  .route('/login_success/:token')
  
 .get(passport.authenticate('bearer', { session: false }), (req, res) => {
    User.findOne(
      { token: req.params.token }
    )
    .then(user => {
      Playlist.find(
        { userId: user._id }
      )
      .sort({createdDate: 'desc'})
      .then(playlist => {
       Playlist.find({ _id: { $in: user.favouritePlaylists }}).then(favouritePlaylist =>{ 
                         return res.json(
                          {
                            user:
                            { 
                              username:user.username, 
                              token: user.token, 
                              accessToken: user.accessToken, 
                              userId: user._id,
                              favouritePlaylists: favouritePlaylist,
                              queue: user.queue
                            }, 
                            playlist: playlist
                          });
                      })
      })
    })
    .catch(err => res.sendStatus(500));
  });

usersRouter
  .route('/login/:token')
  .get(passport.authenticate('basic', { session: false }), (req, res) => {
    User.findOne(
      { token: req.params.token }
    )
    .then(user => {
        return res.json({access_token: user.accessToken,
                  token: user.token
            });
    })
    .catch(err => res.sendStatus(500));
  });
  
  
  usersRouter
  .route('/queue/:token')
  .put(passport.authenticate('bearer', { session: false }), (req, res) => {
    User.findOneAndUpdate(
      { token: req.params.token },
      {queue: req.body.queue},{new:true}
    )
    .then(user => {
        return res.json(user.queue);
    })
    .catch(err => res.sendStatus(500));
  });

passport.use(
  new BearerStrategy(
    (accessToken, done) => {
      User.findOne(
        {
          accessToken: accessToken,
        },
        (err, user) => {
          if (err) {
              return done(err);
          }
          if (!user) {
              return done(null, false);
          }
          return done(null, user, {
              scope: 'all'
          });
        }
      );
    }
  )
);


export default usersRouter;
