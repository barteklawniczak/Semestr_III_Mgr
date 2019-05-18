// songModel.js

var mongoose = require('mongoose');

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
    create_date: {
        type: Date,
        default: Date.now
    }
});

// Export Contact model
var Song = module.exports = mongoose.model('song', songSchema);

module.exports.get = function (callback, limit) {
    Song.find(callback).limit(limit);
}
