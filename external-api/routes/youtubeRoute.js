import express from 'express';
const youtubeRoute = express.Router();
import request from 'request';
import querystring from 'querystring';
import secret from './client_secret';

youtubeRoute
  .route('/')
  .post((req, res) => {

    const data = querystring.stringify({
      key: secret.youtube.api_key,
      part: 'snippet',
      type: 'video',
      q: req.body.search,
      maxResults: 50
      /*
      ADDITIONAL PARAMS
      order: string
        date
        rating
        relevance
        title
        viewCount
        videoCount
      safeSearch: string
        moderate
        none
        strict
      videoCaption: string
        any
        closedCaption
        none
      videoDefinition
        any
        high
        standard
      videoDimension
        2d
        3d
        any
      videoDuration
        any
        long
        medium   (4-20 min)
        short    (4 min or less)
      videoEmbeddable
        any
        true
      videoLicense
        any
        creativeCommon
        youtube
      videoSyndicated
        any
        true
      videoType
        any
        episode
        movie
      */
    });

    request.get('https://www.googleapis.com/youtube/v3/search?' + data, (error, response, body) => {
      const resultsArr = JSON.parse(response.body).items;
      const newResultsArr = [];
      resultsArr.forEach((element) => {
        newResultsArr.push(
          {
            videoId: element.id.videoId
          },
          {
            snippet: element.snippet
          }
        )
      })
      res.json(newResultsArr);

      }
    )
  });

export default youtubeRoute;