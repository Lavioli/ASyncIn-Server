import express from 'express';
const vimeoRoute = express.Router();
import request from 'request';
import querystring from 'querystring';

let client_id = process.env.VIMEO_CLIENT_ID;
let client_secret = process.env.VIMEO_CLIENT_SECRET;
let access_token = process.env.VIMEO_ACCESS_TOKEN;

vimeoRoute
	.route('/')
	.post((req, res) => {
		const data = querystring.stringify({
			access_token: access_token,
			query: req.body.search,
			per_page: 30,
			page: 1
		});
		request.get('https://api.vimeo.com/videos?' + data, (error, response, body) => {
			const resultArr = JSON.parse(response.body).data
			const result = [];
			resultArr.forEach((element) => {
				result.push(
					{
						link: element.link,
						title: element.name,
						source: 'Vimeo'
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