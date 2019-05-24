// songController.js

// Import song model
Song = require('./songModel');

// Handle index actions
exports.index = function (req, res) {
    Song.get(function (err, songs) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Songs retrieved successfully",
            data: songs
        });
    });
};

// Handle create song actions
exports.new = function (req, res) {
    var song = new Song();
    song.title = req.body.title ? req.body.title : song.title;
    song.band = req.body.band;
    song.genre = req.body.genre;
    song.user = req.body.user;

// save the song and check for errors
    song.save(function (err) {
        // if (err)
        //    res.json(err);

        res.json({
            message: 'New song created!',
            data: song
        });
    });
};

// Handle view song info
exports.view = function (req, res) {
    Song.findById(req.params.song_id, function (err, song) {
        if (err)
            res.status(404).send(err);
        res.json({
            message: 'song details loading..',
            data: song
        });
    });
};

// Handle update song info
exports.update = function (req, res) {

    Song.findById(req.params.song_id, function (err, song) {
        if (err)
            res.send(err);

        song.title = req.body.title ? req.body.title : song.title;
        song.band = req.body.band;
        song.genre = req.body.genre;

// save the song and check for errors
        song.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'song Info updated',
                data: song
            });
        });
    });
};

// Handle delete song
exports.delete = function (req, res) {
    Song.remove({
        _id: req.params.song_id
    }, function (err, song) {
        if (err)
            res.send(err);

        res.json({
            status: "success",
            message: 'song deleted'
        });
    });
};
