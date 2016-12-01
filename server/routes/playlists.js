import express from 'express';
import passport from '../config/passport';
import bcrypt from 'bcrypt';
import {Strategy as BearerStrategy} from 'passport-http-bearer';
import tokenGenerator from '../config/tokenGenerator';
import validateUser from './validators';
import User from '../models/user';
import Playlist from '../models/playlist';
const playlistsRouter = express.Router();

playlistsRouter
  .route('/:userId')


    // if(req.body.newPlaylists) {
    //   User.findOneAndUpdate({ accessToken: req.query.access_token }, { playlists: req.body.newPlaylists }, { new:true })
    //     .then(user => {
    //       if (!user) return res.status(404).json({ message: 'User not found.' });
    //         return res.json(user);
    //     });
    // }