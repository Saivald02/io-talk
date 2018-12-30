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
            privatemsg: '',
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
    sendPrivateMessage = e => {
        e.stopPropagation();
        e.preventDefault();
        console.log('e value is: ' + this.state.privatemsg);

        const privatemsg = this.state.privatemsg;

        const receiver = this.props.currentPrivateChat;
        const sender = this.props.log.email;
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
                          console.log('private message saved in database')
                          console.log(response.data);
                          //this.setState({ fireRedirect: true });
                          //var userInfo = { email: email, log: true };
                          //this.props.login(userInfo);

                          this.props.socket.emit('privatemsg', data, (success) => {
                      		    if (success) {
                      			      console.log('--- private msg success ---');
                                  console.log(data);


                                  var msg = data.nick +': ' + data.message;
                                  this.props.addPrivateMessage(sender, receiver, msg, 1);
                                  //var msg = 'you sent private message to ' + data.nick + ': ' + data.message;
                                  //this.state.privateMsgHistory.push(msg);
                                  //this.setState({});
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





            // 1 axios and log to database
            // 2 socket io emit after success from database
            // 3 show privte mesasge

        }
        //console.log(e.target.value);
        //console.log('clicking ' + this.props.user);
        //console.log('clikcing close chat');
        //this.props.closePrivateChat(false);

        //
    }

    render() {
        //let roomsList = null;
        //let showList = null;

        return (
            <div>
                <h2> Private message </h2>
                <div className="inline private-input-box block">
                    <input
                        type="text"
                        className="private-input private-input-big"
                        onInput={(e) => this.setState({ privatemsg: e.target.value })} />
                    <button type="button" className="btn pull-left" onClick={this.sendPrivateMessage}>Send Private Message</button>
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
    //console.log('--- iceland weather to props ---');
    return { currentPrivateChat, log };
}

//export default Iceland;
export default connect(mapStateToProps,{ addPrivateMessage })(ChatWithSocket);

/*
PrivateMessage.propTypes = {
    username: PropTypes.string
};

PrivateMessage.contextTypes = {
    socket: PropTypes.object.isRequired
};
*/
