import React, { Component } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import SocketContext from './socket-context';
import socketIOClient from "socket.io-client";

import SignInUpContainer from './components/SignInUpContainer/SignInUpContainer';

//const endpoint = "http://127.0.0.1:4001";
const endpoint = "/";
const socket = socketIOClient(endpoint);

export class App extends Component {
  constructor() {
    super();
    this.state = {

    };
  }
  componentDidMount() {
      console.log('app mount');
  }

  render() {
      return (
        <SocketContext.Provider value={socket}>
            <Router basename={process.env.PUBLIC_URL}>
                <div>
                    <Switch>
                        <Route exact path="/" component={SignInUpContainer} />
                    </Switch>
                </div>
            </Router>
        </SocketContext.Provider>
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
