import React, { Component } from "react";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//import socketIOClient from "socket.io-client";
import Temp from './components/Temp/Temp';
import Weather from './components/Weather/Weather';
import './App.css';


import Register from './components/Register/Register';

export class App extends Component {
  constructor() {
    super();
    this.state = {

    };
  }
  componentDidMount() {
      console.log('app mount');
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
        <Router basename={process.env.PUBLIC_URL}>
            <div>

                <Route path="/" component={Register} />
                <Route exact path="/temp" component={Temp} />
                <Route exact path="/weather" component={Weather} />
            </div>
        </Router>
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
