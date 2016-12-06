#ASYNCIN SEARCH API
######ASyncIn is a simple music/video compiler to customize your playlist using platforms such as YouTube, SoundCloud, and Vimeo. 

Users can be fetched, created, and updated. 
Saved playlists can be fetched, created, and updated.
All user endpoints require authentication via the Basic, Google, and Facebook strategies.
Users can conduct video/music searches which utilizes the HTTP api from youtube, soundcloud, and vimeo for public data.

##API DOCUMENTATION
###API search endpoints


##``/api/search``
Endpoint representing youtube video searches
#####`POST /api/search`
___URL Parameters:___
NONE
___Data Parameters:___
Search Object: 
* search (string)
___Query String Parameters:___
NONE
___Returns:___
An array of objects that contains search results from youtube, soundcloud, and vimeo

___Send Example:___
```
> POST /api/search
> {
>   "search": "taylor swift"
> }
```

___Response Example:___

```
{
  "soundcloud": [
    {
      "link": "https://soundcloud.com/alibrustofski/bad-blood-taylor-swift-cover-by-ali-brustofski",
      "title": "Bad Blood - Taylor Swift - Cover By Ali Brustofski",
      "thumbnail": "https://i1.sndcdn.com/artworks-000116241721-tzy7vg-large.jpg",
      "source": "SoundCloud"
    },
    {
      "link": "https://soundcloud.com/madilyn-bailey-official_1457539153257/i-knew-you-were-trouble",
      "title": "I Knew You Were Trouble - Madilyn Bailey ( Taylor Swift )",
      "thumbnail": null,
      "source": "SoundCloud"
    }
  ],
  "vimeo": [
      {
        "link": "https://vimeo.com/31288701",
        "title": "Taylor Swift \"Teardrops On My Guitar\"",
        "thumbnail": "https://i.vimeocdn.com/video/210774566_960x636.jpg?r=pad",
        "source": "Vimeo"
      },
      {
        "link": "https://vimeo.com/53812885",
        "title": "8 Hours Taylor Swift",
        "thumbnail": "https://i.vimeocdn.com/video/371831930_1280x720.jpg?r=pad",
        "source": "Vimeo"
      }
  ],
  "youtube": [
      {
        "link": "https://www.youtube.com/watch?v=e-ORhEE9VVg",
        "title": "Taylor Swift - Blank Space",
        "thumbnail": "https://i.ytimg.com/vi/e-ORhEE9VVg/hqdefault.jpg",
        "source": "YouTube"
      },
      {
        "link": "https://www.youtube.com/watch?v=IdneKLhsWOQ",
        "title": "Taylor Swift - Wildest Dreams",
        "thumbnail": "https://i.ytimg.com/vi/IdneKLhsWOQ/hqdefault.jpg",
        "source": "YouTube"
      }
  ]
}
```

##``/api/v1/users``
Endpoint representing login 
#####`GET /api/v1/users/login/:token`
___URL Parameters:___
token
___Data Parameters:___
NONE
___Query String Parameters:___
NONE
___Returns:___
User's object and Playlist's object

___Send Example:___
```
> GET /api/v1/users/login/:token

```
___Response Example:___

```
{
  "user": {
    "username": "admin",
    "token": "email@gmail.com",
    "accessToken": "duv1jvvka8ss4kkwogowcggg8s8csg8ws8",
    "userId": "5841da5a38d6f14e07339d5f",
    "favouritePlaylists": [
      "5841da9b38d6f1454e07339d60"
    ]
  },
  "playlist": [
    {
      "_id": "5841da9b38d6f14e07339d60",
      "userId": "5841da5a38d6f14e07339d5f",
      "name": "playlist name",
      "rating": 27,
      "isPublic": true,
      "__v": 0,
      "tracks": [
        {
          "title": "title1",
          "link": "http://www.youtube.com",
          "source": "youtube"
        },
        {
          "title": "title2",
          "link": "http://www.youtube.com",
          "source": "youtube"
        }
      ]
    }
  ]
}
```

Endpoint representing 
#####`GET /api/v1/users`
___URL Parameters:___
NONE
___Data Parameters:___
NONE
___Query String Parameters:___
access_token
___Returns:___
An array of objects containing the userid, username, token, favouritePlaylists 

___Send Example:___
```
> GET /api/v1/users?access_token=gfhgfhghghghd

```
___Response Example:___

```
[
  {
    "_id": "583f16ee0ab0b50b35cba743",
    "username": "user1",
    "token": "101778571642462694061",
    "favouritePlaylists": []
  },
  {
    "_id": "583f16fc0ab0b50b35cba744",
    "username": "user2",
    "token": "101795760312702",
    "favouritePlaylists": []
  }
]
```

##``/api/v1/users``

#####`POST /api/v1/users`
___URL Parameters:___
NONE
___Data Parameters:___
username, password, email
___Query String Parameters:___
NONE
___Returns:___
User object containing the username, token, userId,favouritedPlaylists and access token and an empty Playlist object 

___Send Example:___
```
> POST /api/v1/users
{
	"username":"user3",
	"password":"password3",
	"email":"user3@gmail.com"
}
```
___Response Example:___

```
{
  "user": {
    "username": "user5",
    "token": "user5@gmail.com",
    "accessToken": "0uubf8b2zkkssogs48g8w804w8gks8owcg",
    "userId": "58419d85310ef24924f679ba",
    "favouritePlaylists": []
  },
  "playlist": []
}
```

##``/api/v1/users/``

#####`PUT /api/v1/users`
___URL Parameters:___
NONE
___Data Parameters:___
newUsername and currentUsername 
OR
newPassword
___Query String Parameters:___
access_token
___Returns:___
An object containing the username, token, userId,favouritedPlaylists and access token 

___Send Example:___
```
> PUT /api/v1/users?access_token=gfhgfhghghghd
{
	"newUsername":"user"
}

```
```
> PUT /api/v1/users?access_token=gfhgfhghghghd
{
	"newPassword":"password"
}

```
___Response Example:___
On username change
```
{
  "username": "user",
  "token": "101778571642462694061",
  "accessToken": "ya29.CjCmAx7mNnuxmmhdY71ww6F4pddN8LxYErTZbHDF3g3kg65UdgU0wiCxOCbGyCzi6dg",
  "userId": "583f16ee0ab0b50b35cba743",
  "favouritePlaylists": []
}
```
On password change
```
{
  "message": "Your password has been changed successfully."
}
```

##``/api/v1/users``

#####`GET /api/v1/users/:token`
___URL Parameters:___
token
___Data Parameters:___
NONE
___Query String Parameters:___
access_token
___Returns:___
User object containing the username, token, userId,favouritedPlaylists and access token and  Playlist object 

___Send Example:___
```
> GET /api/v1/users/:token?access_token=gfhgfhghghghd

```

___Response Example:___

```
{
  "user": {
    "username": "surbhi",
    "token": "user123511@gmail.com",
    "accessToken": "0onfjufpswkco48ggos4ookswgs0s0g0gw",
    "userId": "583f7f4023caf01bfabe4812",
    "favouritePlaylists": [
      "5446566"
    ]
  },
  "playlist": []
}
```
##``/api/v1/users``

#####`PUT /api/v1/users/:token`
___URL Parameters:___
token
___Data Parameters:___
playlistId and rating
___Query String Parameters:___
access_token
___Returns:___
User and Playlist object 
___Send Example:___
```
> PUT /api/v1/users/:token?access_token=gfhgfhghghghd

{
	"playlistId":"5841da9b38d6f14e07339d60",
	"rating":28
}

```

___Response Example:___

```
{
  "user": {
    "username": "admin",
    "token": "email@gmail.com",
    "accessToken": "duv1jvvka8ss4kkwogowcggg8s8csg8ws8",
    "userId": "5841da5a38d6f14e07339d5f",
    "favouritePlaylists": [
      "5841da9b38d6f1454e07339d60"
    ]
  },
  "playlist": {
    "_id": "5841da9b38d6f14e07339d60",
    "userId": "5841da5a38d6f14e07339d5f",
    "name": "playlist name",
    "rating": 27,
    "isPublic": true,
    "__v": 0,
    "tracks": [
      {
        "title": "title1",
        "link": "http://www.youtube.com",
        "source": "youtube"
      },
      {
        "title": "title2",
        "link": "http://www.youtube.com",
        "source": "youtube"
      }
    ]
  }
}
```
##``/api/v1/playlists``
For Top Playlists
#####`GET /api/v1/playlists`
___URL Parameters:___
NONE
___Data Parameters:___
NONE
___Query String Parameters:___
access_token
___Returns:___
Playlist object having public playlist and sorted in descending order 

___Send Example:___
```
> GET /api/v1/playlists?access_token=gfhgfhghghghd

```
___Response Example:___

```
[
  {
    "_id": "5842840117424e08bb204bda",
    "userId": "5842839317424e08bb204bd6",
    "name": "playlist 12name11",
    "rating": 23,
    "isPublic": true,
    "__v": 0,
    "tracks": [
      {
        "title": "title1",
        "link": "http://www.youtube.com",
        "source": "youtube"
      },
      {
        "title": "title2",
        "link": "http://www.youtube.com",
        "source": "youtube"
      }
    ]
  },
  {
    "_id": "584283b517424e08bb204bd7",
    "userId": "5842839317424e08bb204bd6",
    "name": "playlist name111",
    "rating": 10,
    "isPublic": true,
    "__v": 0,
    "tracks": [
      {
        "title": "title1",
        "link": "http://www.youtube.com",
        "source": "youtube"
      },
      {
        "title": "title2",
        "link": "http://www.youtube.com",
        "source": "youtube"
      }
    ]
  }
]
```



##``/api/v1/playlists``

#####`GET /api/v1/playlists/:userId`
___URL Parameters:___
playlistId
___Data Parameters:___
NONE
___Query String Parameters:___
access_token
___Returns:___
Playlist object 

___Send Example:___
```
> GET /api/v1/playlists/:playlistId?access_token=gfhgfhghghghd

```
___Response Example:___

```
{
  "_id": "5841c50e2e6a5c4d56098686",
  "userId": "5841ae0941f10b4bc773cc87",
  "name": "playlist name",
  "rating": 10,
  "isPublic": true,
  "__v": 0,
  "tracks": [
    {
      "title": "title221",
      "link": "http://www.youtube.com",
      "source": "youtube"
    },
    {
      "title": "title222",
      "link": "http://www.youtube.com",
      "source": "youtube"
    }
  ]
}
```

##``/api/v1/playlists``

#####`POST /api/v1/playlists/:userId`
___URL Parameters:___
userId
___Data Parameters:___
NONE
___Query String Parameters:___
access_token
___Returns:___
Playlist object having userId, name, tracks array, rating and isPublic

___Send Example:___
```
> POST /api/v1/playlists/:userId?access_token=gfhgfhghghghd
{
	"userId": "583f5fa1a9e99d159bf23e4d",
	"name": "playlist name",
	"tracks": [
		{
			"title": "title1",
			"link": "http://www.youtube.com",
			"source": "youtube"
		},
		{
			"title": "title2",
			"link": "http://www.youtube.com",
			"source": "youtube"
		}
	],
	"rating": 10,
	"isPublic": true
}
```

___Response Example:___

```
{
  "__v": 0,
  "userId": "583f5fa1a9e99d159bf23e4d",
  "name": "playlist name",
  "rating": 10,
  "isPublic": true,
  "_id": "5841a14c73ab7a4b62ae89a1",
  "tracks": [
    {
      "source": "youtube",
      "link": "http://www.youtube.com",
      "title": "title1"
    },
    {
      "source": "youtube",
      "link": "http://www.youtube.com",
      "title": "title2"
    }
  ]
}
```

##``/api/v1/playlists``

#####`PUT /api/v1/playlists/:userId/:playlistId`
___URL Parameters:___
userId and playlistId
___Data Parameters:___
NONE
___Query String Parameters:___
access_token
___Returns:___
Playlist object having userId, name, tracks array, rating and isPublic

___Send Example:___
```
> PUT /api/v1/playlists/:userId/:playlistId?access_token=gfhgfhghghghd
{
	"userId": "583f5fa1a9e99d159bf23e4d",
	"name": "playlist name",
	"tracks": [
		{
			"title": "title1",
			"link": "http://www.youtube.com",
			"source": "youtube"
		},
		{
			"title": "title2",
			"link": "http://www.youtube.com",
			"source": "youtube"
		}
	],
	"rating": 10,
	"isPublic": true
}
```

___Response Example:___

```
{
  "__v": 0,
  "userId": "583f5fa1a9e99d159bf23e4d",
  "name": "playlist name",
  "rating": 10,
  "isPublic": true,
  "_id": "5841a14c73ab7a4b62ae89a1",
  "tracks": [
    {
      "source": "youtube",
      "link": "http://www.youtube.com",
      "title": "title1"
    },
    {
      "source": "youtube",
      "link": "http://www.youtube.com",
      "title": "title2"
    }
  ]
}
```
##``/api/v1/playlists``

#####`DELETE /api/v1/:userId/:playlistId`
___URL Parameters:___
playlistId
___Data Parameters:___
NONE
___Query String Parameters:___
access_token
___Returns:___
message 

___Send Example:___
```
> DELETE /api/v1/playlists/:userId/:playlistId?access_token=gfhgfhghghghd

```
___Response Example:___

```
{
  "message": "The playlist is successfully deleted."
}
```