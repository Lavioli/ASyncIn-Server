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
  

  .post(passport.authenticate('bearer', {session: false}), (req, res) => {
    
    const newPlaylist = new Playlist(req.body);
    
    newPlaylist.save((err, playlist) => {
      if (err) return res.status(400).json({message: 'Playlist format error'});
      return res.json(playlist);
    });
  });
  
playlistsRouter
  .route('/:playlistId')
  
  .put(passport.authenticate('bearer', {session: false}), (req, res) => {
    
    User.findOne()
    
    Playlist.findOneAndUpdate({_id: req.params.playlistId}, {playlist: req.body}, {new: true})
    .then(playlist => { 
      return res.json(playlist);
    });
  });
  
    // if(req.body.newPlaylists) {
    //   User.findOneAndUpdate({ accessToken: req.query.access_token }, { playlists: req.body.newPlaylists }, { new:true })
    //     .then(user => {
    //       if (!user) return res.status(404).json({ message: 'User not found.' });
    //         return res.json(user);
    //     });
    // }
  
  
export default playlistsRouter;