import express from 'express';
const youtubeRoute = express.Router();
import request from 'request';
import querystring from 'querystring';

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

let api_key = process.env.YOUTUBE_API_KEY;

youtubeRoute
  .route('/')
  .post((req, res) => {

    const data = querystring.stringify({
      key: api_key,
      part: 'snippet',
      type: 'video',
      q: req.body.search,
      maxResults: 30
    });

    request.get('https://www.googleapis.com/youtube/v3/search?' + data, (error, response, body) => {
      const resultsArr = JSON.parse(response.body).items;
      const newResultsArr = [];
      resultsArr.forEach((element) => {
        newResultsArr.push(
          {
            link: 'https://www.youtube.com/watch?v=' + element.id.videoId,
            title: element.snippet.title
          }
        )
      })
      res.json(newResultsArr);

      }
    )
  });

export default youtubeRoute;