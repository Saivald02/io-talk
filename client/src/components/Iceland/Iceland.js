import React from 'react';

//import socketIOClient from "socket.io-client";

import { connect } from 'react-redux';
import { weatherIceland } from '../../actions/weatherIcelandActions';
import { weatherHvolsvollur } from '../../actions/weatherHvolsvollurActions';
import { weatherSelfoss } from '../../actions/weatherSelfossActions';

import SocketContext from '../../socket-context';

import Loading from '../Loading/Loading';

export class Iceland extends React.Component {

    /*
    constructor() {
        super();
        this.state = {
            endpoint: "http://127.0.0.1:4001"
            //endpoint: "/"
        };
    }
    */
    componentWillUnmount() {

        //this.props.socket.close();
        console.log('---------------------- i did unmount -----------------------');
    }

    componentDidMount() {
        console.log('Iceland forecast MOUNT ----------------------');


        //const { endpoint } = this.state;
        //const socket = socketIOClient(endpoint);

        //socket.on("FromAPI", data => this.setState({ response: data }));

        //socket.on("FromAPIHvols", data => this.setState({ hvols: data }));

        //socket.on("FromAPISelf", data => this.setState({ selfoss: data }));

        //socket.on("weatherForecast", data => this.setState({ forecast: data }));

        //socket.on("FromAPIHvols", data => this.setState({ hvolsvollur: data}));

        //socket.on("FromAPISelfoss", data => this.setState({ selfoss: data}));
        //this.props.socket.open();
        this.props.socket.on('weatherForecast', (data) => {
            console.log('iceland weather update');
            //console.log(userlist);
            this.props.weatherIceland(data);
            //this.setState({ allUsers: userlist });

        });

        this.props.socket.on('FromAPIHvols', (data) => {
            console.log('hvolsvollur weather update');
            //console.log(userlist);
            this.props.weatherHvolsvollur(data);
            //this.setState({ allUsers: userlist });

        });

        this.props.socket.on('FromAPISelfoss', (data) => {
            console.log('selfoss weather update');
            //console.log(userlist);
            this.props.weatherSelfoss(data);
            //this.setState({ allUsers: userlist });

        });
    }

    render() {

        const forecast = this.props.iceland;
        const hvolsvollur = this.props.hvolsvollur;
        const selfoss = this.props.selfoss;
        //console.log(forecast);
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

const ChatWithSocket = props => (
  <SocketContext.Consumer>
    {socket => <Iceland {...props} socket={socket} />}
  </SocketContext.Consumer>
)

const mapStateToProps = ({ iceland, selfoss, hvolsvollur }) => {
    //console.log('--- iceland weather to props ---');
    return { iceland, selfoss, hvolsvollur };
}

//export default Iceland;
export default connect(mapStateToProps,{ weatherIceland, weatherSelfoss, weatherHvolsvollur })(ChatWithSocket);
