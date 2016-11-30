import express from 'express';
const soundcloudRoute = express.Router();
import request from 'request';
import querystring from 'querystring';
import secret from './client_secret';

soundcloudRoute
	.route('/')
	.post((req, res) => {
		console.log(req.body.search)
		const data = querystring.stringify({
			client_id: client_id,
			tags: req.body.search, //or use=> title: req.body.search
			limit: 100 //search limit
		});
		request.get('https://api.soundcloud.com/tracks/?' + data, (error, response, body) => {
			res.json(JSON.parse(response.body));
		});
	});

export default soundcloudRoute;

