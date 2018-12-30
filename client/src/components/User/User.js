import React from 'react';

//import socketIOClient from "socket.io-client";
import axios from "axios";
//import SocketContext from '../../socket-context';
import { connect } from 'react-redux';
import { openPrivateChat } from '../../actions/privateChatActions';
import { databasePrivateMessages } from '../../actions/databasePrivateMessagesActions';
import { clearSocketPrivateMessages } from '../../actions/allPrivateMessagesActions';
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
      this.props.openPrivateChat(this.props.user);
      console.log('clicking ' + this.props.user);

      const sender = this.props.log.email;
      const receiver = this.props.user;
      //console.log('get private message history');

      console.log('sender: ' + sender);
      console.log('receiver: ' + receiver);
      axios.get('/api/getPrivateMessageHistory', {
          params: {
            sender: sender,
            receiver: receiver
          }
      })
      .then((response) => {

          var sorted = response.data.data.sort((a, b) => a.date > b.date);
          console.log('sorted private messages from database');
          //console.log(sorted);
          this.props.databasePrivateMessages(sorted);
          this.props.clearSocketPrivateMessages();
          //this.props.
          //this.setState({data: sorted});



      })
      .catch(function (error) {
        console.log(error);
      });





      //
  }
  render() {
      const { user } = this.props;
      console.log('--------------------------- render users ---------------------------');

      //console.log(this.props.allUnreadPrivateMessages);
      //if()

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
const mapStateToProps = ({ currentPrivateChat, log, allUnreadPrivateMessages }) => {
    //console.log('--- iceland weather to props ---');
    return { currentPrivateChat, log };
}

export default connect(mapStateToProps,{ openPrivateChat, databasePrivateMessages, clearSocketPrivateMessages })(User);