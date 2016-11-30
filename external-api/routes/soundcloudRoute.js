import express from 'express';
const soundcloudRoute = express.Router();
import request from 'request';
import querystring from 'querystring';
import secret from './client_secret';

var client_id = secret.soundcloud.client_id;

soundcloudRoute
	.route('/')
	.post((req, res) => {
		const data = querystring.stringify({
			client_id: client_id,
			q: req.body.search,
			limit: 200, //search limit is 200
			/*
			ADDITIONAL PARAMS:
			title: req.body.search 
			tags: req.body.search 
			filter	enumeration	(all,public,private)
			license	enumeration	Filter on license.
				“no-rights-reserved”
				“all-rights-reserved”
				“cc-by”
				“cc-by-nc”
				“cc-by-nd”
				“cc-by-sa”
				“cc-by-nc-nd”
				“cc-by-nc-sa”
			bpm[from]	number	return tracks with at least this bpm value
			bpm[to]	number	return tracks with at most this bpm value
			duration[from]	number	return tracks with at least this duration (in millis)
			duration[to]	number	return tracks with at most this duration (in millis)
			created_at[from]	date	(yyyy-mm-dd hh:mm:ss) return tracks created at this date or later
			created_at[to]	date	(yyyy-mm-dd hh:mm:ss) return tracks created at this date or earlier
			ids	list	a comma separated list of track ids to filter on
			genres	list	a comma separated list of genres
			types	enumeration	a comma separated list of types
				“original”
				“remix”
				“live”
				“recording”
				“spoken”
				“podcast”
				“demo”
				“in progress”
				“stem”
				“loop”
				“sound effect”
				“sample”
				“other”
			*/

		});
		request.get('https://api.soundcloud.com/tracks/?' + data, (error, response, body) => {
			const resultsArr = JSON.parse(response.body);
			const results = [];
			resultsArr.forEach((element) => {
				results.push(
					{
						link: element.permalink_url,
						title: element.title,
						artwork: element.artwork,
						purchase_url: element.purchase_url,
						created_at: element.created_at
					}
				);
			});
			res.json(results);
		});
	});

export default soundcloudRoute;

