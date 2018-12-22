
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
//const axios = require("axios");
const port = process.env.PORT || 4001;
//const index = require("./routes/index");
const path = require('path')
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// ----------------- database -----------
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const router = express.Router();
const logger = require("morgan");

var routes = require('./Database/routes');
app.use(bodyParser.json());

// hide datebase username and password from github and heroku, type on command line
//locashost -> export MONGOLAB_URI="mongodb://username:password@ds79234.mlab.com:9234/collection-name';
//heroku -> heroku config:set MONGOLAB_URI=mongodb://dbuser:dbpassword@ds041506.mlab.com:‌‌​​41506/flickr_image_‌​s‌​earch
const dbRoute = process.env.MONGOLAB_URI;
//console.log(dbRoute);

mongoose.connect(
    dbRoute,
    { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));
// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use("/api", routes);

app.use(express.static(path.join(__dirname, 'client/build')))

const SocketManager = require('./SocketIO/SocketManager')

io.on('connection', SocketManager)

server.listen(port, () => console.log(`Listening on port ${port}`));
