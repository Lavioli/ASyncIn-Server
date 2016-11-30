import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

import youtubeRoute from './routes/youtubeRoute';
import vimeoRoute from './routes/vimeoRoute';

const app = express();

app.post('*', jsonParser);
app.put('*', jsonParser);
app.use(bodyParser.json())

//routes for youtube api REST calls
app.use('/api/youtube', youtubeRoute);
app.use('/api/vimeo', vimeoRoute);
// app.use('/api/v1/users', usersRouter);
// app.use('/auth/google', googleRouter);
// app.use('/api/v1/playlists', playlistsRouter);
// app.use(passport.initialize());

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
