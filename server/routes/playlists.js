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
