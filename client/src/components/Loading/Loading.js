import React from 'react';

//import socketIOClient from "socket.io-client";


export class Loading extends React.Component {
    constructor() {
        super();
        this.state = {
            //response: false,
            //selfoss: false,
            //hvols: false,
            load: []
            //newUser: false,
            //endpoint: "http://127.0.0.1:4001"
            //endpoint: "/"
        };
    }

    componentDidMount() {
        console.log('loading');
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

        console.log('render loading');

        return (
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          );
      }
}

export default Loading;

/*
axios.all([
    axios.get('https://apis.is/weather/observations/is?stations=6310,6310?time=1h'),
    axios.get('https://apis.is/weather/observations/is?stations=6222,6222?time=1h')
])
.then(axios.spread((selfoss, hvolsollur) => {
    // do something with both responses
}));
*/
