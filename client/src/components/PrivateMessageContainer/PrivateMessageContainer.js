import React from 'react';

import { connect } from 'react-redux';

import PrivateMessageReceive from '../PrivateMessageReceive/PrivateMessageReceive';
import PrivateMessageSend from '../PrivateMessageSend/PrivateMessageSend';

import PrivateMessageHistory from '../PrivateMessageHistory/PrivateMessageHistory';

import { closePrivateChat } from '../../actions/privateChatActions';

class PrivateMessageContainer extends React.Component {

    componentDidCatch(error, info) {
        console.log(error, info);
    }

    componentDidMount() {

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
                    <p> private chat with: { this.props.currentPrivateChat } </p>
                    <PrivateMessageHistory />
                    <PrivateMessageReceive />
                    <PrivateMessageSend />
                </div>
            );
        } else {
            return (
                <div>
                    no private chat window open
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
