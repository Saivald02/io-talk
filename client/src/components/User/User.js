import React from 'react';

//import socketIOClient from "socket.io-client";

//import SocketContext from '../../socket-context';
import { connect } from 'react-redux';
import { openPrivateChat } from '../../actions/privateChatActions';
//import Loading from '../Loading/Loading';

export class User extends React.Component {

  componentDidMount() {
      //console.log('i did mount');
      //this.props.socket.open();
      //const { endpoint } = this.state;
      //const socket = socketIOClient(endpoint);
      //this.props.socket.on("FromAPI", data => this.setState({ response: data }));

      /*
      socket.on("FromAPIHvols", data => this.setState({ hvols: data }));

      socket.on("FromAPISelf", data => this.setState({ selfoss: data }));

      socket.on("weatherForecast", data => this.setState({ forecast: data }));

      socket.on("newUser", data => this.setState({ newUser: data }));

      socket.emit("clientRender", "hello server");
      */
  }

  startPrivateChat = e => {
      e.stopPropagation();
      e.preventDefault();
      //console.log(e.target.value);
      console.log('clicking ' + this.props.user);
      this.props.openPrivateChat(this.props.user);

      //
  }
  render() {
      //console.log(this.props);
      //console.log('render user');
      const { user } = this.props;
      //const { response } = this.state;
      //console.log(response);
      //console.log('render oldusel');
      //console.log(response);
      //console.log(selfoss);
      //console.log(hvols);
      //console.log(forecast[0]);
      //console.log(newUser)
      return (
          <button
              type="button"
              className=""
              onClick={this.startPrivateChat}>{ user }
          </button>
      );

    }
  }

/*
const ChatWithSocket = props => (
    <SocketContext.Consumer>
        {socket => <User {...props} socket={socket} />}
    </SocketContext.Consumer>
)
*/
const mapStateToProps = ({ currentPrivateChat }) => {
    //console.log('--- iceland weather to props ---');
    return { currentPrivateChat };
}

//export default ChatWithSocket;
export default connect(mapStateToProps,{ openPrivateChat })(User);
