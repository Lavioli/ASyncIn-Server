import express from 'express';
import passport from '../config/passport';
import User from '../models/user';
import Playlist from '../models/playlist';
const playlistsRouter = express.Router();


playlistsRouter
  .route('/')
//GET top playlists in descending order by rating
  .get(
    passport.authenticate('bearer', { session: false }), 
    (req, res) => {
      Playlist.find(
        {
          isPublic:true
        }
      ).sort(
        [['rating','desc']]
      )
      .then(playlist => {
        return res.json(playlist)
      })
      .catch(err => res.sendStatus(500));
    }
  );
  
 
playlistsRouter
  .route('/:playlistId')
  .get(
    passport.authenticate('bearer', {session: false}), 
    (req, res) => {
      Playlist.findOne(
        {
          _id: req.params.playlistId
        }
      )
      .then(playlist => res.json(playlist))
      .catch(err => res.sendStatus(500));
    }
  );

playlistsRouter
  .route('/profile/:userId')
  .get(
    passport.authenticate('bearer', {session: false}), 
    (req, res) => {
      Playlist.findOne(
        {
          userId: req.params.userId
        }
      )
      .then(playlist => {
       return res.json(playlist)
      })
      .catch(err => res.sendStatus(500));
    }
  )

playlistsRouter
  .route('/:userId')
  .post(passport.authenticate('bearer', {session: false}), 
    (req, res) => {
      User.findOne(
        {
          _id: req.params.userId
        }
      )
      .then(user => {
        if(user.accessToken === req.query.access_token && user._id.toString() === req.body.userId.toString()) {
          Playlist.find(
            {
              userId: req.body.userId
            }
          )
          .sort({createdDate: 'desc'})
          .then(playlists => {
            for(let i = 0; i < playlists.length; i++) {
              if(playlists[i].name === req.body.name) {
                return res.status(400).json({message: "This playlist name already exists"});
              }
            }
            const newPlaylist = new Playlist(req.body);
            newPlaylist.save((err, playlist) => {
              if (err) {
                return res.status(400).json({message: 'Playlist format error'});
              }
              return res.json(playlist);
            });
          });
        } else {
          return res.status(400).json({message:'You\'re not authorized to modify this playlist'});
        }
      });
    }
  );
 
  
playlistsRouter
  .route('/:userId/:playlistId')
  .put(
    passport.authenticate('bearer', {session: false}), 
    (req, res) => {
      User.findOne(
        {
          _id: req.params.userId
        }
      )
      .then(user => {
        if(user.accessToken === req.query.access_token && user._id.toString() === req.body.userId.toString()) {
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
              Playlist.find(
                {
                  userId: req.params.userId
                }
              )
              .sort({createdDate: 'desc'})
              .then(playlist => {
                return res.json(playlist);
              });
            });
        } else {
            return res.status(400).json({message:'You\'re not authorized to modify this playlist'});
        }
      });
    }
  )
  
  .delete(
    passport.authenticate('bearer', {session: false}), 
    (req, res) => {
      Playlist.findOne(
        {
          _id: req.params.playlistId
        }
      )
      .then(playlist => {
        if (!playlist) {
          return res.status(404).json({message: 'Playlist not found'});
        }
        if (playlist.userId.toString() === req.params.userId.toString()) {
          Playlist.findByIdAndRemove(
            req.params.playlistId
          )
          .then(playlist => {
            Playlist.find(
              {
                userId: req.params.userId
              }
            )
            .sort({createdDate: 'desc'})
            .then(playlist => {
              return res.json(playlist);
            });
          });
        } else {
          return res.json({message: "You are not authorized to delete this playlist"});
        }
      });
  });

playlistsRouter
  .route('/updatename/:userId/:playlistId')
  .put(
    passport.authenticate('bearer', {session: false}), 
    (req, res) => {
      User.findOne(
        {
          _id: req.params.userId
        }
      )
      .then(user => {
        if(user.accessToken === req.query.access_token && user._id.toString() === req.body.userId.toString()) {
          Playlist.find(
            {
              userId: req.body.userId
            }
          )
          .sort({createdDate: 'desc'})
          .then(playlists => {
            for(var i=0; i<playlists.length ; i++) {
              if(playlists[i].name === req.body.name) {
                return res.status(400).json({message: "This playlist name already exists"});
              }
            }
            Playlist.findOneAndUpdate(
              {
                _id: req.params.playlistId
              }, 
              {
                name: req.body.name
              }, 
              {new: true}
            )
            .then(playlist => {
              Playlist.find(
                {
                  userId: req.params.userId
                }
              )
              .sort({createdDate: 'desc'})
              .then(playlist => {
                return res.json(playlist);
              });
            });
          })
        } else {
            return res.status(400).json({message:'You\'re not authorized to modify this playlist'});
        }
      });
    }
  )
  
export default playlistsRouter;