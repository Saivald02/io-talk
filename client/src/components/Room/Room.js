import React from 'react';
import axios from "axios";
import { connect } from 'react-redux';
import { openRoomChat } from '../../actions/roomChatActions';
import { databaseRoomMessages } from '../../actions/databaseRoomMessagesActions';
import { clearSocketRoomMessages } from '../../actions/allRoomMessagesActions';
import { readRoomMessages } from '../../actions/unreadRoomMessagesActions';

export class Room extends React.Component {

  componentDidMount() {

  }

  startRoomChat = e => {
      e.stopPropagation();
      e.preventDefault();

      this.props.openRoomChat(this.props.room);
      if(this.props.unreadRoomMsg !== undefined) {
          this.props.readRoomMessages(this.props.room, 0)
      }

      const sender = this.props.log.username;
      const currentRoomChat = this.props.room;

      console.log('sender: ' + sender);
      console.log('room: ' + currentRoomChat);
      axios.get('/api/getRoomMessageHistory', {
          params: {
            sender: sender,
            room: currentRoomChat
          }
      })
      .then((response) => {
          //console.log('response ');
          //console.log(response.success);
          if(response.data.success === false) {
                console.log('no room message history');
                this.props.databaseRoomMessages([]);
          } else {
              var sorted = response.data.data.sort((a, b) => a.date > b.date);
              console.log('sorted private messages from database');
              this.props.databaseRoomMessages(sorted);
              this.props.clearSocketRoomMessages();
          }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

    render() {
        var counter = 0;
        const { room } = this.props;

        if(this.props.unreadRoomMsg !== undefined) {
              //console.log('not undefined');
              //console.log(this.props.unreadPrivateMsg.byHash[user]);
              if(this.props.unreadRoomMsg.byHash[room] !== undefined) {
                  //console.log('not undefined 2');
                  //console.log(this.props.unreadPrivateMsg.byHash[user].counter);
                  counter = this.props.unreadRoomMsg.byHash[room].counter
              }
        }

        if(counter === 0) {
            return (
                <div className="counter-container"
                    onClick={ this.startRoomChat }>
                    <div
                        className="counter-user"> { room }
                    </div>
                </div>
            );
        } else {
            return (
                <div
                    className="counter-container"
                    onClick={ this.startRoomChat } >
                    <div className="counter-grid">
                        <div className="counter-user"> { room } </div>
                        <div className="counter"> { counter } </div>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = ({ currentRoomChat, log, unreadRoomMsg }) => {
    return { currentRoomChat, log, unreadRoomMsg };
}

export default connect(mapStateToProps,{ readRoomMessages, openRoomChat, databaseRoomMessages, clearSocketRoomMessages })(Room);
