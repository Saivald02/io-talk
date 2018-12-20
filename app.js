// https://github.com/amkurian/simple-chat

// https://darksky.net/dev/docs#api-request-types
// https://darksky.net/dev/account

// http://docs.apis.is/#endpoint-weather

// https://io-talk.herokuapp.com/
// https://medium.com/@eugrdn/deploy-create-react-app-with-sockets-io-to-heroku-1def8d53b976

// https://medium.com/createdd-notes/starting-with-authentication-a-tutorial-with-node-js-and-mongodb-25d524ca0359

//-----------------------------------------------
/*
1. Create repo on github.com

2.
echo "# new-chatter" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin git@github.com:Saivald02/new-chatter.git
git push -u origin master

3. Connect to circle CI and Heroku
*/

// To make API server and mongo-DB
// https://devcenter.heroku.com/articles/mean-apps-restful-api

// React app and server -> https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0
// https://codeclimate.com
// https://circleci.com
// https://www.heroku.com/
// https://saivald02-loan.herokuapp.com/ <-------

// ------------------------------- mikilvægt ---------------------------------------
// testing codeclimate, circleci and heroku:
// https://medium.freecodecamp.org/how-to-set-up-continuous-integration-and-deployment-for-your-react-app-d09ae4525250
// socket io , react, heroku
// ATH -> https://www.valentinog.com/blog/socket-io-node-js-react/#Where_to_go_from_here
// ATH database -> https://hackernoon.com/how-to-combine-a-nodejs-back-end-with-a-reactjs-front-end-app-ea9b24715032
// ATH -> https://medium.com/@eugrdn/deploy-create-react-app-with-sockets-io-to-heroku-1def8d53b976

// https://www.youtube.com/watch?v=VFFr9PYgRGY <-- heroku deploy


// ---------------------------------------------------------------------------------------------------


// https://medium.com/codeclan/testing-react-with-jest-and-enzyme-20505fec4675

// create reaact-app + redux
// https://medium.com/backticks-tildes/setting-up-a-redux-project-with-create-react-app-e363ab2329b8
//-----------------------------------------------

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const port = process.env.PORT || 4001;
const index = require("./routes/index");
const path = require('path')
const app = express();
//app.use(index);
const server = http.createServer(app);
const io = socketIo(server);

// ----------------- database -----------
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const router = express.Router();
const Data = require("./data");
//var ObjectID = mongodb.ObjectID;
const logger = require("morgan");
//const Data = require("./data");

app.use(bodyParser.json());


// hide datebase username and password from github and heroku
//export MONGOLAB_URI="mongodb://username:password@ds79234.mlab.com:9234/collection-name';
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

// this is our get method
// this method fetches all available data in our database
router.get("/getData", (req, res) => {
    Data.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

// this is our create methid
// this method adds new data in our database
router.post("/putData", (req, res) => {
    let data = new Data();

    const { id, message } = req.body;

    if ((!id && id !== 0) || !message) {
        return res.json({
            success: false,
            error: "INVALID INPUTS"
        });
    }
    data.message = message;
    data.id = id;
    console.log('adding stuff to database');
    console.log(data);
    data.save(err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// this is our update method
// this method overwrites existing data in our database
router.post("/updateData", (req, res) => {
    const { id, update } = req.body;
    Data.findOneAndUpdate(id, update, err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// this is our delete method
// this method removes existing data in our database
router.delete("/deleteData", (req, res) => {
    const { id } = req.body;
    Data.findOneAndDelete(id, err => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});
// append /api for our http requests
app.use("/api", router);


//---------------------------------------


app.use(express.static(path.join(__dirname, 'client/build')))


io.on("connection", socket => {

  console.log('new client connection');

  var interval = setInterval(function () {
      //previous = update(previous);
      getApiAndEmit(socket)
  }, 10000);

  socket.on('disconnect', function () {
      console.log('client disconnect');
      clearInterval(interval);
  });

  io.sockets.emit('newUser', 'new socket');

  /*
  socket.on('clientRender', function () {
      console.log('client page render');
      // emit that someone disconnected
  });
  */
  /*
  socket.on('disconnect', function () {
      console.log('client disconnect');
      socket.on('disconnect', function () {
          console.log('client disconnect');
          // emit that someone disconnected
      });
        // emit that someone disconnected
  });
  */

  //getApiAndEmit(socket)
  //socket.on("disconnect", () => console.log("Client disconnected"));
});

// hella 6315
// selfoss 6310
// 6222 hvolsvöllur
const getApiAndEmit = async socket => {
  try {
    //console.log('trying to send data');
    /*
    const selfoss = await axios.get(
      "https://apis.is/weather/observations/is?stations=6310,6310?time=1h"
    );

    const hvols = await axios.get(
      "https://apis.is/weather/observations/is?stations=6222,6222?time=1h"
    );
    */

    const forecast = await axios.get(
      "https://apis.is/weather/texts?types=2,31"
    );

    //console.log(selfoss.data.results[0]);
    //console.log(hvols.data.results[0]);
    //console.log(forecast.data.results);
    //console.log(quake.data.results);
    //console.log('---------------------------------------');

    /*
    // öldusel 63.824410, -20.128533
    const oldusel = await axios.get(
      "https://api.darksky.net/forecast/e3b1e048dd74c7ca5d0a5263e2ca792d/63.824410,-20.128533?lang=is&units=si"
    );
    */

    /*
    // KELDUR
    const res = await axios.get(
      "https://api.darksky.net/forecast/e3b1e048dd74c7ca5d0a5263e2ca792d/63.816667,-20.083333?lang=is&units=si"
    );
    */
    // longitude: -20.083333
    // lati: 63.816667
    //console.log(res.data.currently.temperature);
    //console.log(oldusel.data.currently.temperature);

    //socket.emit("FromAPI", oldusel.data.currently);

    /*
    var d = new Date();
    var t = d.toLocaleTimeString();
    */
    //socket.emit("FromAPI", res);

    //socket.emit("FromAPIHvols", hvols.data.results[0]);

    //socket.emit("FromAPISelf", selfoss.data.results[0]);

    socket.emit("weatherForecast", forecast.data.results);

  } catch (error) {
    console.error(`Error 2 - Iceland weather: ${error.code}`);
  }
};

/*
const sendBackToClient = async socket => {
  try {

    //socket.emit("weatherForecast", forecast.data.results);

  } catch (error) {
    console.error(`Error 3: ${error.code}`);
  }
};
*/

server.listen(port, () => console.log(`Listening on port ${port}`));
