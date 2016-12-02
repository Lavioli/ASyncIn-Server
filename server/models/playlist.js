import mongoose from 'mongoose';

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
        type: Date
    }
});

const Playlists = mongoose.model('Playlists', PlaylistSchema);

export default Playlists;