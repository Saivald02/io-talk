// https://github.com/amkurian/simple-chat
// https://darksky.net/dev/docs#api-request-types
// https://io-talk.herokuapp.com/
// https://medium.com/@eugrdn/deploy-create-react-app-with-sockets-io-to-heroku-1def8d53b976
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

  console.log("New client connected"), setInterval(
    () => getApiAndEmit(socket),
    //console.log('ticking'),
    10000
  );
  socket.on("disconnect", () => console.log("Client disconnected"));
});


const getApiAndEmit = async socket => {
  try {
      console.log('trying to send data');
    //const res = await axios.get(
    //  "https://api.darksky.net/forecast/e3b1e048dd74c7ca5d0a5263e2ca792d/37.8267,-122.4233"
    //);
    //console.log(res.data);
    //socket.emit("FromAPI", res.data.currently.temperature);
    var d = new Date();
    var t = d.toLocaleTimeString();
    socket.emit("FromAPI", t);
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};
server.listen(port, () => console.log(`Listening on port ${port}`));
