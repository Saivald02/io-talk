import React from 'react';

import socketIOClient from "socket.io-client";

import Loading from '../Loading/Loading';

export class Iceland extends React.Component {
    constructor() {
        super();
        this.state = {
            //response: false,
            //selfoss: false,
            //hvols: false,
            forecast: false,
            hvolsvollur: false,
            selfoss: false,
            //newUser: false,
            //endpoint: "http://127.0.0.1:4001"
            endpoint: "/"
        };
    }

    componentDidMount() {
        console.log('Iceland forecast');
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);

        //socket.on("FromAPI", data => this.setState({ response: data }));

        //socket.on("FromAPIHvols", data => this.setState({ hvols: data }));

        //socket.on("FromAPISelf", data => this.setState({ selfoss: data }));

        socket.on("weatherForecast", data => this.setState({ forecast: data }));

        socket.on("FromAPIHvols", data => this.setState({ hvolsvollur: data}));

        socket.on("FromAPISelfoss", data => this.setState({ selfoss: data}));

        //socket.on("newUser", data => this.setState({ newUser: data }));

        //socket.emit("clientRender", "hello server");
    }

    render() {
        const { forecast, hvolsvollur, selfoss } = this.state;
        console.log('render iceland');
        //console.log(response);
        //console.log(selfoss);
        //console.log(hvols);
        //console.log(forecast[0]);
        //console.log(newUser);

        if(forecast !== false && hvolsvollur !== false && selfoss !== false) {
            return (
                <div>
                    <p>
                      {forecast[0].title}: {forecast[0].content}
                    </p>
                    <p>
                      {forecast[1].title}: {forecast[1].content}
                    </p>
                    <p> Hvolsvöllur: hiti: {hvolsvollur.T}°, vindur: {hvolsvollur.F}, hviður: {hvolsvollur.FG}</p>
                    <p> Selfoss: hiti: {selfoss.T}°, vindur: {selfoss.F}, hviður: {selfoss.FG}</p>
                  </div>
              );
        } else {
            return (
                <Loading />
            );
        }
      }
}

export default Iceland;

/*
axios.all([
    axios.get('https://apis.is/weather/observations/is?stations=6310,6310?time=1h'),
    axios.get('https://apis.is/weather/observations/is?stations=6222,6222?time=1h')
])
.then(axios.spread((selfoss, hvolsollur) => {
    // do something with both responses
}));
*/
