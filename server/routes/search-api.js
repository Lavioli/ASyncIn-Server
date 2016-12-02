import express from 'express';
const searchRouter = express.Router();
import axios from 'axios';
import querystring from 'querystring';

searchRouter
	.route('/')
	.post((req, res) => {
		let allResults = {
			soundcloud: [],
			vimeo: [],
			youtube: []
		};
		const soundCloudData = querystring.stringify({
			client_id: process.env.SOUNDCLOUD_CLIENT_ID,
			q: req.body.search,
			limit: 10
		});
		const vimeoData = querystring.stringify({
			access_token: process.env.VIMEO_ACCESS_TOKEN,
			query: req.body.search,
			per_page: 5,
			page: 1
		});
		const youtubeData = querystring.stringify({
		  key: process.env.YOUTUBE_API_KEY,
		  part: 'snippet',
		  type: 'video',
		  q: req.body.search,
		  maxResults: 5
		});
		axios.all([
			axios.get('https://www.googleapis.com/youtube/v3/search?' + youtubeData),
			axios.get('https://api.soundcloud.com/tracks/?' + soundCloudData),
			axios.get('https://api.vimeo.com/videos?' + vimeoData)
			
		]).then(axios.spread((youtube, soundcloud, vimeo) => {
			soundcloud.data.forEach((element) => {
        		allResults.soundcloud.push(
        			{
        				link: element.permalink_url,
        				title: element.title,
        				source: 'SoundCloud'
        			}
        		);
        	});
    		vimeo.data.data.forEach((element) => {
				allResults.vimeo.push(
					{
						link: element.link,
						title: element.name,
						source: 'Vimeo'
					}
				);
			});
			youtube.data.items.forEach((element) => {
				allResults.youtube.push(
					{
						link: 'https://www.youtube.com/watch?v=' + element.id.videoId,
						title: element.snippet.title,
						source: 'YouTube'
					}
				);
			});
			console.log(allResults.soundcloud.length);
        	res.json(allResults);
		})).catch(err => {
          return res.json(err);
		})
	});

export default searchRouter;