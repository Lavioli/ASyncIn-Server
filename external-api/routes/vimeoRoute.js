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
		});
		request.get('https://api.vimeo.com/videos?' + data, (error, response, body) => {
		  	  res.json(JSON.parse(response.body).data);
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
