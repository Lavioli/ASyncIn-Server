import express from 'express';
const vimeoRouter = express.Router();
import request from 'request';
import querystring from 'querystring';
// import {Vimeo} from 'vimeo';
import secret from './client_secret';

const client_id = secret.vimeo.client_id;
const client_secret = secret.vimeo.client_secrets;
const access_token = secret.vimeo.access_token;


vimeoRouter
	.route('/')

//generate unauthenticated access token to access public data
// const lib = new Vimeo(CLIENT_ID, CLIENT_SECRET);
//get access_token, only need to be used once and store access token in client secret and can be used forever

  /*
	.get((req, res) => {
    lib.generateClientCredentials('/', (err, access_token) => {
    	if (err) {
    		throw err;
    	}
    	const token = access_token.access_token;
    	const scope = access_token.scope;
    });
	})
  */
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

export default vimeoRouter;