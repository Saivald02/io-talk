
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 4001;
const path = require('path')
const app = express();


const server = http.createServer(app);

//const io = socketIo(server);

// ----------------- database -----------
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const router = express.Router();
const logger = require("morgan");

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var routes = require('./Database/routes');
//app.use(bodyParser.json());

// hide datebase username and password from github and heroku, type on command line
const dbRoute = process.env.MONGOLAB_URI;

mongoose.connect(
    dbRoute,
    { useNewUrlParser: true }
);

// fixes: DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead
mongoose.set('useCreateIndex', true);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));
// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
} else {
  app.use(express.static(path.join(__dirname, '/client/public')));
  app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "./client/public/index.html"));
  });
}

//app.use(express.static(path.join(__dirname, 'client/build')))


const SocketManager = require('./SocketIO/SocketManager')
//io.on('connection', SocketManager)


const io = require('socket.io').listen(server);

SocketManager(io);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(err.status || 500);
  res.send(err.message);
});

server.listen(port, () => console.log(`Listening on port ${port}`));
