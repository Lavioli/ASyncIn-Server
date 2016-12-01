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
    "title": "Taylor Swift - Blank Space"
  },
  {
    "link": "https://www.youtube.com/watch?v=IdneKLhsWOQ",
    "title": "Taylor Swift - Wildest Dreams"
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
    "title": "Taylor Swift \"Teardrops On My Guitar\""
  },
  {
    "link": "https://vimeo.com/53812885",
    "title": "8 Hours Taylor Swift"
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
    "title": "Bad Blood - Taylor Swift - Cover By Ali Brustofski"
  },
  {
    "link": "https://soundcloud.com/madilyn-bailey-official_1457539153257/i-knew-you-were-trouble",
    "title": "I Knew You Were Trouble - Madilyn Bailey ( Taylor Swift )"
  }
]
```
