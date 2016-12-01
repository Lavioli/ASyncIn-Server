import express from 'express';
const youtubeRoute = express.Router();
import request from 'request';
import querystring from 'querystring';

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
            title: element.snippet.title,
            source: 'YouTube'
          }
        )
      })
      res.json(newResultsArr);

      }
    )
  });

export default youtubeRoute;