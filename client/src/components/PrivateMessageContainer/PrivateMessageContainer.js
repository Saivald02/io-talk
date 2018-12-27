import React from 'react';

import { connect } from 'react-redux';

import PrivateMessageReceive from '../PrivateMessageReceive/PrivateMessageReceive';
import PrivateMessageSend from '../PrivateMessageSend/PrivateMessageSend';

import { closePrivateChat } from '../../actions/privateChatActions';

class PrivateMessageContainer extends React.Component {

    componentDidCatch(error, info) {
        console.log(error, info);
    }

    componentDidMount() {
        /*
        //const { socket } = this.context;
        this.props.socket.on('recv_privatemsg', (from, recievedMsg) => {
            var msg = 'private message received from ' + from +
                ': ' + recievedMsg;
            //this.state.privateMsgHistory.push(msg);
            console.log('did i receive msg??');
            this.setState({privatemsg: msg}); // to render again

        });
        */
    }
    /*
    constructor(props) {
        super(props);
        this.state = {
            privatemsg: '',
            //privateMsgHistory: [],
            //receiver: ''
        };
    }
    */

    closePrivateChatWindow = e => {
        e.stopPropagation();
        e.preventDefault();
        //console.log(e.target.value);
        //console.log('clicking ' + this.props.user);
        //console.log('clikcing close chat');
        this.props.closePrivateChat(false);

        //
    }

    render() {
        //let roomsList = null;
        //let showList = null;
        //const { privatemsg } = this.state;
        //console.log(this.props);
        const { currentPrivateChat } = this.props;
        //console.log(currentPrivateChat);
        if(currentPrivateChat !== false) {
            return (
                <div>
                    <button
                        type="button"
                        className=""
                        onClick={this.closePrivateChatWindow}> close private chat
                    </button>
                    <PrivateMessageReceive />
                    <PrivateMessageSend />
                </div>
            );
        } else {
            return (
                <div>
                    <PrivateMessageReceive />
                    <PrivateMessageSend />
                </div>
            );
        }
    }
};

/*
const ChatWithSocket = props => (
    <SocketContext.Consumer>
        {socket => <PrivateMessageContainer {...props} socket={socket} />}
    </SocketContext.Consumer>
)
*/
const mapStateToProps = ({ currentPrivateChat }) => {
    //console.log('--- iceland weather to props ---');
    return { currentPrivateChat };
}

//export default Iceland;
export default connect(mapStateToProps,{ closePrivateChat })(PrivateMessageContainer);

/*
PrivateMessage.propTypes = {
    username: PropTypes.string
};

PrivateMessage.contextTypes = {
    socket: PropTypes.object.isRequired
};
*/
