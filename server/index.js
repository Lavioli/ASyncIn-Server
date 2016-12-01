import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
import mongoose from 'mongoose';
import passport from './config/passport';
// const setCORS = require('./config/cors');

mongoose.Promise = global.Promise;


import usersRouter from './routes/users';
import googleRouter from './config/google-oauth';
import facebookRouter from './config/facebook-oauth';
const app = express();
const User = require('./models/user');



app.use(passport.initialize());
app.use(passport.session());


// app.use('/api/v1/*', setCORS);
// app.options("", (req, res) => res.sendStatus(200));
app.post('*', jsonParser);
app.put('*', jsonParser);
app.use('/api/v1/users', usersRouter);
app.use('/auth/google', googleRouter);
app.use('/auth/facebook', facebookRouter);



const CUSTOM_PORT = isNaN(Number(process.argv[2])) ? null : Number(process.argv[2]);

const runServer = function (callback) {
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
  runServer(function () {
    console.log("server started");
  });
}

exports.app = app;
exports.runServer = runServer;
