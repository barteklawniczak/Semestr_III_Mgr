// api-routes.js

// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});

// Import contact controller
var songController = require('./songController');

// Contact routes
router.route('/songs')
    .get(songController.index)
    .post(songController.new);

router.route('/songs/:contact_id')
    .get(songController.view)
    .patch(songController.update)
    .put(songController.update)
    .delete(songController.delete);

// Export API routes
module.exports = router;
