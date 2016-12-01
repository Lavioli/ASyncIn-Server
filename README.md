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
    "videoId": "e-ORhEE9VVg"
  },
  {
    "snippet": {
      "publishedAt": "2014-11-10T17:05:44.000Z",
      "channelId": "UCANLZYMidaCbLQFWXBC95Jg",
      "title": "Taylor Swift - Blank Space",
      "description": "Watch Taylor's new video for \"Blank Space\". No animals, trees, automobiles or actors were harmed in the making of this video. Taylor's new release 1989 is ...",
      "thumbnails": {
        "default": {
          "url": "https://i.ytimg.com/vi/e-ORhEE9VVg/default.jpg",
          "width": 120,
          "height": 90
        },
        "medium": {
          "url": "https://i.ytimg.com/vi/e-ORhEE9VVg/mqdefault.jpg",
          "width": 320,
          "height": 180
        },
        "high": {
          "url": "https://i.ytimg.com/vi/e-ORhEE9VVg/hqdefault.jpg",
          "width": 480,
          "height": 360
        }
      },
      "channelTitle": "TaylorSwiftVEVO",
      "liveBroadcastContent": "none"
    }
  },
  {
    "videoId": "IdneKLhsWOQ"
  },
  {
    "snippet": {
      "publishedAt": "2015-08-31T00:55:00.000Z",
      "channelId": "UCANLZYMidaCbLQFWXBC95Jg",
      "title": "Taylor Swift - Wildest Dreams",
      "description": "Check out Taylor's new video “Wildest Dreams”. “Wildest Dreams” is Available Now on her multi-platinum release 1989 on iTunes or Google Play: ...",
      "thumbnails": {
        "default": {
          "url": "https://i.ytimg.com/vi/IdneKLhsWOQ/default.jpg",
          "width": 120,
          "height": 90
        },
        "medium": {
          "url": "https://i.ytimg.com/vi/IdneKLhsWOQ/mqdefault.jpg",
          "width": 320,
          "height": 180
        },
        "high": {
          "url": "https://i.ytimg.com/vi/IdneKLhsWOQ/hqdefault.jpg",
          "width": 480,
          "height": 360
        }
      },
      "channelTitle": "TaylorSwiftVEVO",
      "liveBroadcastContent": "none"
    }
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
    "name": "Taylor Swift \"Teardrops On My Guitar\"",
    "description": "Taylor Swift \"Teardrops On My Guitar\"\nDirector: Trey Fanjoy\nDirector of Photography: Joseph Labisi",
    "pictures": {
      "uri": "/videos/31288701/pictures/210774566",
      "active": true,
      "type": "custom",
      "sizes": [
        {
          "width": 100,
          "height": 75,
          "link": "https://i.vimeocdn.com/video/210774566_100x75.jpg?r=pad",
          "link_with_play_button": "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F210774566_100x75.jpg&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
        },
        {
          "width": 200,
          "height": 150,
          "link": "https://i.vimeocdn.com/video/210774566_200x150.jpg?r=pad",
          "link_with_play_button": "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F210774566_200x150.jpg&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
        },
        {
          "width": 295,
          "height": 166,
          "link": "https://i.vimeocdn.com/video/210774566_295x166.jpg?r=pad",
          "link_with_play_button": "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F210774566_295x166.jpg&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
        },
        {
          "width": 640,
          "height": 424,
          "link": "https://i.vimeocdn.com/video/210774566_640x424.jpg?r=pad",
          "link_with_play_button": "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F210774566_640x424.jpg&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
        },
        {
          "width": 960,
          "height": 636,
          "link": "https://i.vimeocdn.com/video/210774566_960x636.jpg?r=pad",
          "link_with_play_button": "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F210774566_960x636.jpg&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
        }
      ],
      "resource_key": "6b2f4f716773fb7d116064a49d5216e4ae793ece"
    }
  },
  {
    "link": "https://vimeo.com/53812885",
    "name": "8 Hours Taylor Swift",
    "description": "A day in the life with Taylor Swift directed and produced by Nigel Barker, cinematography Marcus Brooks and Theo Stanley",
    "pictures": {
      "uri": "/videos/53812885/pictures/371831930",
      "active": true,
      "type": "custom",
      "sizes": [
        {
          "width": 100,
          "height": 75,
          "link": "https://i.vimeocdn.com/video/371831930_100x75.jpg?r=pad",
          "link_with_play_button": "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F371831930_100x75.jpg&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
        },
        {
          "width": 200,
          "height": 150,
          "link": "https://i.vimeocdn.com/video/371831930_200x150.jpg?r=pad",
          "link_with_play_button": "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F371831930_200x150.jpg&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
        },
        {
          "width": 295,
          "height": 166,
          "link": "https://i.vimeocdn.com/video/371831930_295x166.jpg?r=pad",
          "link_with_play_button": "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F371831930_295x166.jpg&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
        },
        {
          "width": 640,
          "height": 360,
          "link": "https://i.vimeocdn.com/video/371831930_640x360.jpg?r=pad",
          "link_with_play_button": "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F371831930_640x360.jpg&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
        },
        {
          "width": 960,
          "height": 540,
          "link": "https://i.vimeocdn.com/video/371831930_960x540.jpg?r=pad",
          "link_with_play_button": "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F371831930_960x540.jpg&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
        },
        {
          "width": 1280,
          "height": 720,
          "link": "https://i.vimeocdn.com/video/371831930_1280x720.jpg?r=pad",
          "link_with_play_button": "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F371831930_1280x720.jpg&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png"
        }
      ],
      "resource_key": "2b66c10c671c0f8e977534f0efa9562faf741eab"
    }
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
    "purchase_url": "http://msclvr.co/Ali-BadBlood",
    "created_at": "2015/05/10 01:15:59 +0000"
  },
  {
    "link": "https://soundcloud.com/madilyn-bailey-official_1457539153257/i-knew-you-were-trouble",
    "title": "I Knew You Were Trouble - Madilyn Bailey ( Taylor Swift )",
    "purchase_url": "https://itunes.apple.com/us/artist/madilyn-bailey/id463191657",
    "created_at": "2013/04/23 03:29:25 +0000"
  }
]
```
