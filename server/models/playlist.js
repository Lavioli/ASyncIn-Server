import mongoose from 'mongoose';

const trackSchema = {
  title: String,
  link: String,
  source: String,
  thumbnail: String
};

const PlaylistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    tracks: [trackSchema],
    rating:{
        type: Number
    },
    isPublic:{
        type: Boolean
    },
    createdDate:{
        type: Date, 
        default: Date.now
    }
});

const Playlists = mongoose.model('Playlists', PlaylistSchema);

export default Playlists;