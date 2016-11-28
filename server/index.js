const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jsonParser = bodyParser.json();
// const passport = require('./config/passport');
// const setCORS = require('./config/cors');

mongoose.Promise = global.Promise;

// const playlistsRouter = require('./routes/playlists');
// const usersRouter = require('./routes/users');

const app = express();


// app.use('/api/v1/*', setCORS);
app.options("", (req, res) => res.sendStatus(200));
// app.post('*', jsonParser);
// app.put('*', jsonParser);
// app.use('/api/v1/playlists', playlistsRouter);
// app.use('/api/v1/users', usersRouter);
// app.use(passport.initialize());


//testing get route
app.get("/", (req,res) => {
  res.json({"res": "ok"});
});

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
  runServer();
}

exports.app = app;
exports.runServer = runServer;
