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
			limit: 20
		});
		const vimeoData = querystring.stringify({
			access_token: process.env.VIMEO_ACCESS_TOKEN,
			query: req.body.search,
			per_page: 15,
			page: 1
		});
		const youtubeData = querystring.stringify({
		  key: process.env.YOUTUBE_API_KEY,
		  part: 'snippet',
		  type: 'video',
		  q: req.body.search,
		  maxResults: 15
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
        				thumbnail: element.artwork_url,
        				source: 'SoundCloud'
        			}
        		);
        	});
    		vimeo.data.data.forEach((element) => {
    			let thumbnail;
    			if(element.pictures) thumbnail = element.pictures.sizes[element.pictures.sizes.length - 1].link;
				allResults.vimeo.push(
					{
						link: element.link,
						title: element.name,
						thumbnail: thumbnail || element.pictures,
						source: 'Vimeo'
					}
				);
			});
			youtube.data.items.forEach((element) => {
				allResults.youtube.push(
					{
						link: 'https://www.youtube.com/watch?v=' + element.id.videoId,
						title: element.snippet.title,
						thumbnail: element.snippet.thumbnails.high.url,
						source: 'YouTube'
					}
				);
			});
        	res.json(allResults);
		})).catch(err => {
          return res.json(err);
		})
	});

export default searchRouter;