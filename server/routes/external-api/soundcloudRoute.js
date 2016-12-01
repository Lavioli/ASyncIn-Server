import express from 'express';
const soundcloudRoute = express.Router();
import request from 'request';
import querystring from 'querystring';

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

let client_id = process.env.SOUNDCLOUD_CLIENT_ID;

soundcloudRoute
	.route('/')
	.post((req, res) => {
		const data = querystring.stringify({
			client_id: client_id,
			q: req.body.search,
			limit: 30,
		});
		request.get('https://api.soundcloud.com/tracks/?' + data, (error, response, body) => {
			const resultsArr = JSON.parse(response.body);
			const results = [];
			resultsArr.forEach((element) => {
				results.push(
					{
						link: element.permalink_url,
						title: element.title
					}
				);
			});
			res.json(results);
		});
	});

export default soundcloudRoute;