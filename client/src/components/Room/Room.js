import React from 'react';

//import socketIOClient from "socket.io-client";
import axios from "axios";
//import SocketContext from '../../socket-context';
import { connect } from 'react-redux';
import { openRoomChat } from '../../actions/roomChatActions';
import { databaseRoomMessages } from '../../actions/databaseRoomMessagesActions';
import { clearSocketRoomMessages } from '../../actions/allRoomMessagesActions';

import { readRoomMessages } from '../../actions/unreadRoomMessagesActions';
//import Loading from '../Loading/Loading';

export class Room extends React.Component {

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

  startRoomChat = e => {
      e.stopPropagation();
      e.preventDefault();

      //console.log(this.);
      //console.log(e.target.value);
      this.props.openRoomChat(this.props.room);
      if(this.props.unreadRoomMsg !== undefined) {
          this.props.readRoomMessages(this.props.room, 0)
      }

      console.log('clicking ' + this.props.room);


      const sender = this.props.log.email;
      const currentRoomChat = this.props.room;
      //console.log('get private message history');

      console.log('sender: ' + sender);
      console.log('room: ' + currentRoomChat);
      axios.get('/api/getRoomMessageHistory', {
          params: {
            sender: sender,
            room: currentRoomChat
          }
      })
      .then((response) => {

          var sorted = response.data.data.sort((a, b) => a.date > b.date);
          console.log('sorted private messages from database');
          //console.log(sorted);
          this.props.databaseRoomMessages(sorted);
          this.props.clearSocketRoomMessages();
          //this.props.
          //this.setState({data: sorted});



      })
      .catch(function (error) {
        console.log(error);
      });


  }
  render() {
      var counter = 0;
      //const user = 'room name';
      const { room } = this.props;
      console.log('--------------------------- render room ---------------------------');
      //console.log(this.props);
      //console.log(this.props.unreadPrivateMsg);
      //console.log(this.props.allUnreadPrivateMessages);
      //if()

      /*
      if(this.props.unreadPrivateMsg !== undefined) {
            console.log('not undefined');
            //console.log(this.props.unreadPrivateMsg.byHash.user);
            console.log(this.props.unreadPrivateMsg.byHash[user]);
            if(this.props.unreadPrivateMsg.byHash[user] !== undefined) {
                console.log('not undefined 2');
                console.log(this.props.unreadPrivateMsg.byHash[user].counter);
                counter = this.props.unreadPrivateMsg.byHash[user].counter
            }
      }
      */
      if(counter === 0) {
          return (
              <div className="">
                  <button
                      type="button"
                      className="btn"
                      onClick={this.startRoomChat}>{ room }
                  </button>
              </div>
          );
      } else {
        return (
            <div className="">
                <button
                    type="button"
                    className=""
                    onClick={this.startRoomChat}>{ room } { counter }
                </button>
            </div>
        );
      }

    }
  }

/*
const ChatWithSocket = props => (
    <SocketContext.Consumer>
        {socket => <User {...props} socket={socket} />}
    </SocketContext.Consumer>
)
*/
const mapStateToProps = ({ currentRoomChat, log, unreadRoomMsg }) => {
    //console.log('--- iceland weather to props ---');
    return { currentRoomChat, log, unreadRoomMsg };
}

export default connect(mapStateToProps,{ readRoomMessages, openRoomChat, databaseRoomMessages, clearSocketRoomMessages })(Room);
