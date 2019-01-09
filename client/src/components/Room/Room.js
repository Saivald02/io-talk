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

          var sorted = response.data.data.sort((a, b) => a.date > b.date);
          console.log('sorted private messages from database');
          this.props.databaseRoomMessages(sorted);
          this.props.clearSocketRoomMessages();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

    render() {
        var counter = 0;
        const { room } = this.props;

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

const mapStateToProps = ({ currentRoomChat, log, unreadRoomMsg }) => {
    return { currentRoomChat, log, unreadRoomMsg };
}

export default connect(mapStateToProps,{ readRoomMessages, openRoomChat, databaseRoomMessages, clearSocketRoomMessages })(Room);
