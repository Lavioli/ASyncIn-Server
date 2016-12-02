#ASYNCIN SEARCH API
######ASyncIn is a simple music/video compiler to customize your playlist using platforms such as YouTube, SoundCloud, and Vimeo. 

Users can be fetched, created, and updated. 
Saved playlists can be fetched, created, and updated.
All user endpoints require authentication via the Basic, Google, and Facebook strategies.
Users can conduct video/music searches which utilizes the HTTP api from youtube, soundcloud, and vimeo for public data.

##API DOCUMENTATION
###API search endpoints


##``/api/youtube``
Endpoint representing youtube video searches
#####`POST /api/youtube`
___URL Parameters:___
NONE
___Data Parameters:___
Search Object: 
* search (string)
___Query String Parameters:___
NONE
___Returns:___
An array of objects

___Send Example:___
```
> POST /api/youtube
> {
>   "search": "taylor swift"
> }
```

___Response Example:___

```
[
  {
    "link": "https://www.youtube.com/watch?v=e-ORhEE9VVg",
    "title": "Taylor Swift - Blank Space",
    "source": "YouTube"
  },
  {
    "link": "https://www.youtube.com/watch?v=IdneKLhsWOQ",
    "title": "Taylor Swift - Wildest Dreams",
    "source": "YouTube"
  }
]
```

##``/api/vimeo``
Endpoint representing youtube video searches
#####`POST /api/vimeo`
___URL Parameters:___
NONE
___Data Parameters:___
Search Object: 
* search (string)
___Query String Parameters:___
NONE
___Returns:___
An array of objects

___Send Example:___
```
> POST /api/vimeo
> {
>   "search": "taylor swift"
> }
```

___Response Example:___

```
[
  {
    "link": "https://vimeo.com/31288701",
    "title": "Taylor Swift \"Teardrops On My Guitar\"",
    "source": "Vimeo"
  },
  {
    "link": "https://vimeo.com/53812885",
    "title": "8 Hours Taylor Swift",
    "source": "Vimeo"
  }
]
```

##``/api/soundcloud``
Endpoint representing youtube video searches
#####`POST /api/vimeo`
___URL Parameters:___
NONE
___Data Parameters:___
Search Object: 
* search (string)
___Query String Parameters:___
NONE
___Returns:___
An array of objects

___Send Example:___
```
> POST /api/soundcloud
> {
>   "search": "taylor swift"
> }
```

___Response Example:___

```
[
  {
    "link": "https://soundcloud.com/alibrustofski/bad-blood-taylor-swift-cover-by-ali-brustofski",
    "title": "Bad Blood - Taylor Swift - Cover By Ali Brustofski",
    "source": "SoundCloud"
  },
  {
    "link": "https://soundcloud.com/madilyn-bailey-official_1457539153257/i-knew-you-were-trouble",
    "title": "I Knew You Were Trouble - Madilyn Bailey ( Taylor Swift )",
    "source": "SoundCloud"
  }
]
```
##``/api/v1/users/``
Endpoint representing youtube video searches
#####`GET /api/v1/users`
___URL Parameters:___
NONE
___Data Parameters:___
NONE
___Query String Parameters:___
access_token
___Returns:___
An array of objects containing the userid and usernames

___Send Example:___
```
> GET /api/v1/users?access_token=gfhgfhghghghd

```
___Response Example:___

```
[
  {
    "_id": "58407af0afefa02b4c0c8f7a",
    "username": "asyncinmusic"
  },
  {
    "_id": "5840993b41b21f37ff20d179",
    "username": "user3234511"
  }
]
```

##``/api/v1/users/``
Endpoint representing youtube video searches
#####`POST /api/v1/users`
___URL Parameters:___
NONE
___Data Parameters:___
NONE
___Query String Parameters:___
access_token
___Returns:___
An object containing the username, token, userId,favouritedPlaylists and access token

___Send Example:___
```
> POST /api/v1/users?access_token=gfhgfhghghghd
{
	"username":"user3234511",
	"password":"password133234511",
	"email":"user123333511@gmail.com"
}
```
___Response Example:___

```
{
  "username": "user3234511",
  "token": "user123333511@gmail.com",
  "accessToken": "uvs8ihgcgwgcow4g88kwc8o0cgogggskcw",
  "userId": "5840adc9628bda11f3747525",
  "favouritedPlaylists": []
}
```

##``/api/v1/users/``
Endpoint representing youtube video searches
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
An object containing the username and access token

___Send Example:___
```
> POST /api/v1/users?access_token=gfhgfhghghghd
{
	"newUsername":"user"
}

```
```
> POST /api/v1/users?access_token=gfhgfhghghghd
{
	"newPassword":"password"
}

```
___Response Example:___

```
{
  "username": "surbhi1234",
  "accessToken": "0onfjufpswkco48ggos4ookswgs0s0g0gw"
}
```