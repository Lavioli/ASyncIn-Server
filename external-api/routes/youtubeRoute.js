const express = require('express');
const youtubeRouter = express.Router();
const Youtube = require('youtube-api');
import request from 'request';
import querystring from 'querystring';

// import * youtubeAPI as from './auth';

youtubeRouter
  .route('/')
  .post((req, res) => {

    const data = querystring.stringify({
      key: 'AIzaSyCYoFzO03m75aa0cebl6fN5Gz1xPRovnJk',
      part: 'snippet',
      type: 'video',
      q: req.body.search
    });

    // const q = req.body.query;
    request.get('https://www.googleapis.com/youtube/v3/search?' + data, (error, response, body) => {
      res.json(JSON.parse(response.body));
      }
    )
  });

export default youtubeRouter;