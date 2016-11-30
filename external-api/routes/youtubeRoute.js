const express = require('express');
const youtubeRouter = express.Router();
import request from 'request';
import querystring from 'querystring';
import secret from './client_secret';

youtubeRouter
  .route('/')
  .post((req, res) => {

    const data = querystring.stringify({
      key: secret.youtube.api_key,
      part: 'snippet',
      type: 'video',
      q: req.body.search
    });

    request.get('https://www.googleapis.com/youtube/v3/search?' + data, (error, response, body) => {
      res.json(JSON.parse(response.body));
      }
    )
  });

export default youtubeRouter;