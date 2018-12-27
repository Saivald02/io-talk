import React from 'react';
//import { PropTypes } from 'prop-types';

import SocketContext from '../../socket-context';
import { connect } from 'react-redux';

class PrivateMessageSend extends React.Component {

    componentDidCatch(error, info) {
        console.log(error, info);
    }

    componentDidMount() {
        //const { socket } = this.context;
        this.props.socket.on('recv_privatemsg', (from, recievedMsg) => {
            var msg = 'private message received from ' + from +
                ': ' + recievedMsg;
            //this.state.privateMsgHistory.push(msg);
            //this.setState({}) // to render again
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            privatemsg: '',
            //privateMsgHistory: [],
            receiver: ''
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
        //const username = this.props.info;
        const receiver = this.props.currentPrivateChat;
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
                    //var msg = 'you sent private message to ' + data.nick + ': ' + data.message;
                    //this.state.privateMsgHistory.push(msg);
                    //this.setState({});
        				} else {
                    console.log('--- private msg fail ---');
        				}
			      });
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

const mapStateToProps = ({ currentPrivateChat }) => {
    //console.log('--- iceland weather to props ---');
    return { currentPrivateChat };
}

//export default Iceland;
export default connect(mapStateToProps,{ })(ChatWithSocket);

/*
PrivateMessage.propTypes = {
    username: PropTypes.string
};

PrivateMessage.contextTypes = {
    socket: PropTypes.object.isRequired
};
*/
