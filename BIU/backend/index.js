let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let multer = require('multer');
let GridFsStorage = require('multer-gridfs-storage');
let Grid = require('gridfs-stream');
let methodOverride = require('method-override');
let cors = require('cors');
let session = require('express-session');

// Initialize the app
let app = express();
// Import routes
let apiRoutes = require("./api-routes");

app.set('secretKey', 'nodeRestApi'); // jwt secret token

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/biu');

var db = mongoose.connection;
// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Use Api routes in the App
app.use('/api', apiRoutes);

// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// handle errors
app.use(function(err, req, res, next) {
    console.log(err);
    if(err.status === 404)
        res.status(404).json({message: "Not found"});
    else
        res.status(500).json({message: "Something looks wrong"});
});

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running BIU on port " + port);
});
