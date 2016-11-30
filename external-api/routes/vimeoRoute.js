import express from 'express';
const vimeoRoute = express.Router();
import request from 'request';
import querystring from 'querystring';
import {Vimeo} from 'vimeo';
import secret from './client_secret';

const client_id = secret.vimeo.client_id;
const client_secret = secret.vimeo.client_secrets;
const access_token = secret.vimeo.access_token;


vimeoRoute
	.route('/')
	.post((req, res) => {
		const data = querystring.stringify({
			access_token: access_token,
			query: req.body.search,
			per_page: 5,
			page: 1

		/*
		ADDTIONAL PARAMS FOR CONSIDERATION:
			filter: "string"
				CC
				CC-BY
				CC-BY-SA
				CC-BY-ND
				CC-BY-NC
				CC-BY-NC-SA
				CC-BY-NC-ND
				in-progress
				upload_date
				duration
				minimum_likes
				categories
				trending
			sort: "string"
				relevant
				date
				alphabetical
				plays
				likes
				comments
				duration
			direction: "string"
				asc
				desc
			per_page: 100, //100 pp is max
			page: 2, //(response.body).data shows page numbers from paging.last
			uri: "/videos/31288701"  //uniform resource identifier

		*/

		});
		request.get('https://api.vimeo.com/videos?' + data, (error, response, body) => {
			const resultArr = JSON.parse(response.body).data
			const result = [];
			resultArr.forEach((element) => {
				result.push(
					{
						link: element.link,
						name: element.name,
						description: element.description,
						pictures: element.pictures
					}
				);
			});
		  	res.json(result);
		  	}
		);
  	});


//generates unauthenticated access token to access public data, access token can be used forever
vimeoRoute
	.route('/access')
	.get((req, res) => {
	    lib.generateClientCredentials('/', (err, access_token) => {
	    	if (err) {
	    		throw err;
	    	}
	    	const token = access_token.access_token;
	    	const scope = access_token.scope;

	    	res.json(token);
	    });
	});
const lib = new Vimeo(client_id, client_secret);
//optional access token for REST
	// const lib = new Vimeo(client_id, client_secret, access_token); 

export default vimeoRoute;
