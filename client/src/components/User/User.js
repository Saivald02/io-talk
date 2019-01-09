import React from 'react';

//import socketIOClient from "socket.io-client";
import axios from "axios";
//import SocketContext from '../../socket-context';
import { connect } from 'react-redux';
import { openPrivateChat } from '../../actions/privateChatActions';
import { databasePrivateMessages } from '../../actions/databasePrivateMessagesActions';
import { clearSocketPrivateMessages } from '../../actions/allPrivateMessagesActions';

import { readPrivateMessages } from '../../actions/unreadPrivateMessagesActions';
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
      if(this.props.unreadPrivateMsg !== undefined) {
          this.props.readPrivateMessages(this.props.user, 0)
      }

      console.log('clicking ' + this.props.user);

      const sender = this.props.log.username;
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
          this.props.databasePrivateMessages(sorted);
          this.props.clearSocketPrivateMessages();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
    render() {
        var counter = 0;
        const { user } = this.props;
        console.log('--------------------------- render users ---------------------------');
        if(this.props.unreadPrivateMsg !== undefined) {
              console.log('not undefined');
              console.log(this.props.unreadPrivateMsg.byHash[user]);
              if(this.props.unreadPrivateMsg.byHash[user] !== undefined) {
                  console.log('not undefined 2');
                  console.log(this.props.unreadPrivateMsg.byHash[user].counter);
                  counter = this.props.unreadPrivateMsg.byHash[user].counter
              }
        }
        if(counter === 0) {
            return (
                <div className="counter-container"
                    onClick={ this.startPrivateChat }>
                    <div
                        className="counter-user"> { user }
                    </div>
                </div>
            );
        } else {
            return (
                <div
                    className="counter-container"
                    onClick={ this.startPrivateChat } >
                    <div className="counter-grid">
                        <div className="counter-user"> { user } </div>
                        <div className="counter"> { counter } </div>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = ({ currentPrivateChat, log, unreadPrivateMsg }) => {
    return { currentPrivateChat, log, unreadPrivateMsg };
}

export default connect(mapStateToProps,{ readPrivateMessages, openPrivateChat, databasePrivateMessages, clearSocketPrivateMessages })(User);
