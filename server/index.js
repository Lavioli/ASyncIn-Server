import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
import mongoose from 'mongoose';
import passport from './config/passport';
const setCORS = require('./config/cors');

//this checks if the environement (env) is a developement environment and requires thee .env file. if it's not, it will take from heroku env config variables. 
//probably will not need to require in index.js because we are not using the .env file here...
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

mongoose.Promise = global.Promise;


import usersRouter from './routes/users';
import playlistsRouter from './routes/playlists';
import googleRouter from './config/google-oauth';
import facebookRouter from './config/facebook-oauth';
import searchRouter from './routes/search-api';

const app = express();

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/*', setCORS);
app.use('/api/*', setCORS);
app.options("", (req, res) => res.sendStatus(200));
app.post('*', jsonParser);
app.put('*', jsonParser);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/playlists', playlistsRouter);
app.use('/auth/google', googleRouter);
app.use('/auth/facebook', facebookRouter);
app.use('/api/search', searchRouter);

const CUSTOM_PORT = isNaN(Number(process.argv[2])) ? null : Number(process.argv[2]);

const runServer =  (callback) => {
  const databaseUri = process.env.DATABASE_URI || global.databaseUri || 'mongodb://localhost/asyncin';
  mongoose.connect(databaseUri).then(() => {
    const port = process.env.PORT || 8080;
    const server = app.listen(port, () => {
      console.log(`Listening on port ${port}`);
      if (callback) {
        callback(server);
      }
    });
  });
};

if (require.main === module) {
  runServer(() => {
    console.log("server started");
  });
}

exports.app = app;
exports.runServer = runServer;
