// api-routes.js
const jwt = require('jsonwebtoken');

// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API is Working',
        message: 'Welcome to Song API!',
    });
});

function validateUser(req, res, next) {
    console.log(req.headers);
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
        if (err) {
            res.json({status:"error", message: err.message, data:null});
        } else {
            // add user id to request
            req.body.userId = decoded.id;
            next();
        }
    });
}

// Import song controller
let songController = require('./songs/songController');
let userController = require('./users/userController');

// song routes
router.route('/songs')
    .get(songController.index)
    .post(validateUser, songController.new);

router.route('/songs/:song_id')
    .get(songController.view)
    .patch(songController.update)
    .put(songController.update)
    .delete(songController.delete);

router.post('/register', userController.create);
router.post('/authenticate', userController.authenticate);

// Export API routes
module.exports = router;
