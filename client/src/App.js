import React, { Component } from "react";

//import socketIOClient from "socket.io-client";

import './App.css';

import Iceland from './components/Iceland/Iceland';
import Oldusel from './components/Oldusel/Oldusel';
import MessageHistory from './components/MessageHistory/MessageHistory';
import Messages from './components/Messages/Messages';

export class App extends Component {
  constructor() {
    super();
    this.state = {

    };
  }
  componentDidMount() {
    console.log('i did mount');
    //const { endpoint } = this.state;
    //const socket = socketIOClient(endpoint);

    //socket.on("FromAPI", data => this.setState({ response: data }));

    //socket.on("FromAPIHvols", data => this.setState({ hvols: data }));

    //socket.on("FromAPISelf", data => this.setState({ selfoss: data }));

    //socket.on("weatherForecast", data => this.setState({ forecast: data }));

    //socket.on("newUser", data => this.setState({ newUser: data }));

    //socket.emit("clientRender", "hello server");
  }

  render() {
    //const { forecast, newUser, response } = this.state;
    console.log('render');
    //console.log(response);
    //console.log(selfoss);
    //console.log(hvols);
    //console.log(forecast[0]);
    //console.log(newUser);
    // <Messages />
      return (
        <div className="main">
            <Iceland />
            <Oldusel />
            <MessageHistory />
            <Messages />
          </div>
        );
    }
  }

export default App;

/*
axios.all([
    axios.get('https://apis.is/weather/observations/is?stations=6310,6310?time=1h'),
    axios.get('https://apis.is/weather/observations/is?stations=6222,6222?time=1h')
])
.then(axios.spread((selfoss, hvolsollur) => {
    // do something with both responses
}));
*/
