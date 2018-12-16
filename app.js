// https://github.com/amkurian/simple-chat

// https://darksky.net/dev/docs#api-request-types
// https://darksky.net/dev/account

// http://docs.apis.is/#endpoint-weather

// https://io-talk.herokuapp.com/
// https://medium.com/@eugrdn/deploy-create-react-app-with-sockets-io-to-heroku-1def8d53b976

// að fá stöðvar

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

app.use(express.static(path.join(__dirname, 'client/build')))


//app.get('/', (req, res, next) => {
	//var list = ["item1", "item2", "item3"];
	//res.json(list);
	//console.log('Sent list of items');
  //res.sendFile(__dirname + './');
//});

io.on("connection", socket => {


  console.log('new client connection');

  /*
  var interval = setInterval(function () {
      //previous = update(previous);
      getApiAndEmit(socket)
  }, 10000);

  socket.on('disconnect', function () {
      console.log('client disconnect');
      clearInterval(interval);
  });
  */
  io.sockets.emit('newUser', 'new socket');

  socket.on('clientRender', function () {
      console.log('client page render');
      // emit that someone disconnected
  });

  socket.on('disconnect', function () {
      console.log('client disconnect');
      socket.on('disconnect', function () {
          console.log('client disconnect');
          // emit that someone disconnected
      });
        // emit that someone disconnected
  });

  getApiAndEmit(socket)
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
    console.log('---------------------------------------');
    /*
    const res = await axios.get(
        "https://api.darksky.net/forecast/e3b1e048dd74c7ca5d0a5263e2ca792d/37.8267,-122.4233"
    );
    socket.emit("FromAPI", res.data.currently.temperature);
    */

    var d = new Date();
    var t = d.toLocaleTimeString();

    //socket.emit("FromAPI", t);

    //socket.emit("FromAPIHvols", hvols.data.results[0]);

    //socket.emit("FromAPISelf", selfoss.data.results[0]);

    socket.emit("weatherForecast", forecast.data.results);

  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};

const sendBackToClient = async socket => {
  try {

    //socket.emit("weatherForecast", forecast.data.results);

  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};

server.listen(port, () => console.log(`Listening on port ${port}`));
