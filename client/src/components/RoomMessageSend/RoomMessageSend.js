import React from 'react';
import { addRoomMessage } from '../../actions/allRoomMessagesActions';
import SocketContext from '../../socket-context';
import { connect } from 'react-redux';
import axios from "axios";

class RoomMessageSend extends React.Component {

    componentDidCatch(error, info) {
        console.log(error, info);
    }

    componentDidMount() {

    }

    constructor(props) {
        super(props);
        this.state = {
            roommsg: '',
        };
    }

    sendRoomMessage = e => {
        e.stopPropagation();
        e.preventDefault();

        const room = this.props.currentRoomChat;
        const sender = this.props.log.username;
        const msg = this.state.roommsg;
        console.log('sending room message to ' + room + " the message: " + msg);

        if(msg !== '' && room !== '') {
            var data = {
                room: room,
                sender: sender,
                message : msg
            };

            axios.post("/api/roomMessageSend", {
                room: room,
                sender: sender,
                message: data.message
                })
                .then((response) => {
                      if (!response.data.error) {
                          console.log('room message saved in database')
                          console.log(response.data);

                          this.props.socket.emit('sendmsg', data, (success) => {
                      		    if (success) {
                      			      console.log('--- room msg success ---');
                                  console.log(data);

                                  this.props.addRoomMessage(room, sender, data.message, 1);

                      				} else {
                                  console.log('--- room msg fail ---');
                      				}
              			      });
                      } else {
                          console.log('room message fail')
                      }
                  })
                  .catch(error => {
                          console.log('sign in error: ')
                          console.log(error)
                      })
        }
    }

    render() {
        return (
            <div className="send-message">
                <div className="send-message-child-1">
                    <input
                        type="text"
                        className="input-box"
                        onInput={(e) => this.setState({ roommsg: e.target.value })} />
                </div>
                <div className="send-message-child-2">
                    <button type="button" className="btn" onClick={ this.sendRoomMessage }>Send Room Message</button>
                </div>
            </div>
        );
    }
};

const ChatWithSocket = props => (
    <SocketContext.Consumer>
        {socket => <RoomMessageSend {...props} socket={socket} />}
    </SocketContext.Consumer>
)

const mapStateToProps = ({ currentRoomChat, log }) => {
    return { currentRoomChat, log };
}

export default connect(mapStateToProps,{ addRoomMessage })(ChatWithSocket);
