import express from 'express';
import bcrypt from 'bcrypt';
import {Strategy as BearerStrategy} from 'passport-http-bearer';
import passport from '../config/passport';
import tokenGenerator from '../config/tokenGenerator';
import validateUser from './validators';
import User from '../models/user';
import Playlist from '../models/playlist';
const playlistsRouter = express.Router();

playlistsRouter
  .route('/:userId')

  .post(passport.authenticate('bearer', {session: false}), 
    (req, res) => {
      User.findOne({_id: req.params.userId})
      .then(user => {
        if(user.accessToken === req.query.access_token) {
          const newPlaylist = new Playlist(req.body);
          newPlaylist.save(
            (err, playlist) => {
              if (err) return res.status(400).json(
                {
                  message: 'Playlist format error'
                }
              );
              return res.json(playlist);
            }
          );
        }
      });
    }
  );
 
  
playlistsRouter
  .route('/:userId/:playlistId')
  
  .put(passport.authenticate('bearer', {session: false}), 
    (req, res) => {
      User.findOne({_id: req.params.userId})
      .then(user => {
        if(user.accessToken === req.query.access_token) {
          Playlist.findOneAndUpdate(
            {
              _id: req.params.playlistId
            }, 
            {
              name: req.body.name, 
              tracks: req.body.tracks, 
              rating: req.body.rating, 
              isPublic: req.body.isPublic
            }, 
            {new: true}
          )
          .then(playlist => {
            return res.status(200).json(playlist);
          })
          .catch(() => res.status(400).json({message:'You\'re not authorized to modify this playlist'})
          )
        }
    });
  });


export default playlistsRouter;