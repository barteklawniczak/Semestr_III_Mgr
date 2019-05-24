// songModel.js

var mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Setup schema
var songSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    band: {
        type: String,
        required: true
    },
    genre: String,
    lyrics: String,
    videoURL: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

// Export song model
var Song = module.exports = mongoose.model('song', songSchema);

module.exports.get = function (callback, limit) {
    Song.find(callback).limit(limit);
};
