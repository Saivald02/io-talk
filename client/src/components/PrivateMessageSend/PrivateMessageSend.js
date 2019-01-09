import React from 'react';
//import { PropTypes } from 'prop-types';

import { addPrivateMessage } from '../../actions/allPrivateMessagesActions';

import SocketContext from '../../socket-context';
import { connect } from 'react-redux';


import axios from "axios";

class PrivateMessageSend extends React.Component {

    componentDidCatch(error, info) {
        console.log(error, info);
    }

    componentDidMount() {

    }

    constructor(props) {
        super(props);
        this.state = {
            privatemsg: '',
        };
    }

    sendPrivateMessage = e => {
        e.stopPropagation();
        e.preventDefault();
        console.log('e value is: ' + this.state.privatemsg);

        const privatemsg = this.state.privatemsg;

        const receiver = this.props.currentPrivateChat;
        const sender = this.props.log.username;
        console.log('sending private message to ' + receiver + " the message: " + privatemsg);
        //console.log();
        if(privatemsg !== '' && receiver !== '') {
            var data = {
                nick: receiver,
                message : privatemsg
            };


            axios.post("/api/privateMessageSend", {
                sender: sender,
                receiver: receiver,
                message: privatemsg
                })
                .then((response) => {
                      if (!response.data.error) {
                          console.log('private message saved in database');
                          console.log(response.data);

                          this.props.socket.emit('privatemsg', data, (success) => {
                      		    if (success) {
                      			      console.log('--- private msg success ---');
                                  console.log(data);

                                  this.props.addPrivateMessage(receiver, sender, data.message, 1);

                      				} else {
                                  console.log('--- private msg fail ---');
                      				}
              			      });
                      } else {
                          console.log('private message fail')
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
                        onInput={(e) => this.setState({ privatemsg: e.target.value })} />
                </div>
                <div className="send-message-child-2">
                    <button type="button" className="btn" onClick={this.sendPrivateMessage}>Send Private Message</button>
                </div>
            </div>
        );
    }
};

const ChatWithSocket = props => (
    <SocketContext.Consumer>
        {socket => <PrivateMessageSend {...props} socket={socket} />}
    </SocketContext.Consumer>
)

const mapStateToProps = ({ currentPrivateChat, log }) => {
    return { currentPrivateChat, log };
}

export default connect(mapStateToProps,{ addPrivateMessage })(ChatWithSocket);
