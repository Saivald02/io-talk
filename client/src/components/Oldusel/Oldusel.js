import React from 'react';

//import socketIOClient from "socket.io-client";

import SocketContext from '../../socket-context';
import { connect } from 'react-redux';
import Loading from '../Loading/Loading';

export class Oldusel extends React.Component {
  constructor() {
    super();
    this.state = {
      response: false,
      //selfoss: false,
      //hvols: false,

      //newUser: false,
      //endpoint: "http://127.0.0.1:4001"
      //endpoint: "/"
    };
  }
  componentDidMount() {
      console.log('i did mount');
      //this.props.socket.open();
      //const { endpoint } = this.state;
      //const socket = socketIOClient(endpoint);
      this.props.socket.on("FromAPI", data => this.setState({ response: data }));

      /*
      socket.on("FromAPIHvols", data => this.setState({ hvols: data }));

      socket.on("FromAPISelf", data => this.setState({ selfoss: data }));

      socket.on("weatherForecast", data => this.setState({ forecast: data }));

      socket.on("newUser", data => this.setState({ newUser: data }));

      socket.emit("clientRender", "hello server");
      */
  }

  render() {
    const { response } = this.state;
    console.log(response);
    console.log('render oldusel');
    //console.log(response);
    //console.log(selfoss);
    //console.log(hvols);
    //console.log(forecast[0]);
    //console.log(newUser);
    if(response !== false) {
      return (
        <div>
            <p>
              Öldusel: {response.summary}, hiti {response.temperature}, °C vindur: {response.windSpeed} m/s.
            </p>
          </div>
        );
      } else {
        return (
          <Loading />
        );
      }
    }
  }

  const ChatWithSocketx = props => (
    <SocketContext.Consumer>
      {socket => <Oldusel {...props} socket={socket} />}
    </SocketContext.Consumer>
  )

  const mapStateToProps = ({ iceland, selfoss, hvolsvollur }) => {
      //console.log('--- iceland weather to props ---');
      return { iceland, selfoss, hvolsvollur };
  }

  //export default Iceland;
  export default connect(mapStateToProps,{ })(ChatWithSocketx);

/*
axios.all([
    axios.get('https://apis.is/weather/observations/is?stations=6310,6310?time=1h'),
    axios.get('https://apis.is/weather/observations/is?stations=6222,6222?time=1h')
])
.then(axios.spread((selfoss, hvolsollur) => {
    // do something with both responses
}));
*/
