var mongoose = require('mongoose');

var PlaylistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    tracks:{
        type: Array
    },
    rating:{
        type: Number
    },
    isPublic:{
        type: Boolean
    },
    createdDate:{
        type: Date,
        required:true
    }
});

var Playlists = mongoose.model('Playlists', PlaylistSchema);

module.exports = Playlists;