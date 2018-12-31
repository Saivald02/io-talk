import React from 'react';
//import { PropTypes } from 'prop-types';

import { addRoomMessage } from '../../actions/allRoomMessagesActions';

import SocketContext from '../../socket-context';
import { connect } from 'react-redux';


import axios from "axios";

class RoomMessageSend extends React.Component {

    componentDidCatch(error, info) {
        console.log(error, info);
    }

    componentDidMount() {
        //const { socket } = this.context;
        /*
        this.props.socket.on('recv_privatemsg', (from, recievedMsg) => {
            var msg = 'private message received from ' + from +
                ': ' + recievedMsg;
            //this.state.privateMsgHistory.push(msg);
            //this.setState({}) // to render again
        });
        */
    }

    constructor(props) {
        super(props);
        this.state = {
            roommsg: '',
            //privateMsgHistory: [],
            //receiver: ''
        };
    }

    /*
    sendPrivateMessage() {
        //const { socket } = this.context;
        const privatemsg = this.state.privatemsg;
        //const username = this.props.info;
        const receiver = this.state.receiver;
        console.log('sending private message to ' + receiver + " the message: " + privatemsg);
        //console.log();
        if(privatemsg !== '' && receiver !== '') {
            var data = {
                nick: receiver,
                message : privatemsg
            };

            this.props.socket.emit('privatemsg', data, (success) => {
        		    if (success) {
        			      console.log('--- private msg success ---');
                    var msg = 'you sent private message to ' + data.nick + ': ' + data.message;
                    //this.state.privateMsgHistory.push(msg);
                    //this.setState({});
        				} else {
                    console.log('--- private msg fail ---');
        				}
			      });
        }
    }
    */
    sendRoomMessage = e => {
        e.stopPropagation();
        e.preventDefault();
        console.log('sending message in room');
        console.log('e value is: ' + this.state.roommsg);




        const room = this.props.currentRoomChat;
        const sender = this.props.log.email;
        const msg = this.state.roommsg;
        console.log('sending room message to ' + room + " the message: " + msg);
        //console.log();
        if(msg !== '' && room !== '') {
            var data = {
                room: room,
                sender: sender,
                message : sender + ': ' + msg
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
                          //this.setState({ fireRedirect: true });
                          //var userInfo = { email: email, log: true };
                          //this.props.login(userInfo);

                          this.props.socket.emit('sendmsg', data, (success) => {
                      		    if (success) {
                      			      console.log('--- private msg success ---');
                                  console.log(data);


                                  //var msg = data.nick +': ' + data.message;
                                  this.props.addRoomMessage(room, sender, data.message, 1);
                                  //var msg = 'you sent private message to ' + data.nick + ': ' + data.message;
                                  //this.state.privateMsgHistory.push(msg);
                                  //this.setState({});
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
        //let roomsList = null;
        //let showList = null;
        return (
            <div>
                <h2> Room message </h2>
                <div className="inline private-input-box block">
                    <input
                        type="text"
                        className="private-input private-input-big"
                        onInput={(e) => this.setState({ roommsg: e.target.value })} />
                    <button type="button" className="btn pull-left" onClick={this.sendRoomMessage}>Send Room Message</button>
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
    //console.log('--- iceland weather to props ---');
    return { currentRoomChat, log };
}

//export default Iceland;
export default connect(mapStateToProps,{ addRoomMessage })(ChatWithSocket);

/*
PrivateMessage.propTypes = {
    username: PropTypes.string
};

PrivateMessage.contextTypes = {
    socket: PropTypes.object.isRequired
};
*/
