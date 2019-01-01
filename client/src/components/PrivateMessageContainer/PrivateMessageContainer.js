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

    closePrivateChatWindow = e => {
        e.stopPropagation();
        e.preventDefault();

        this.props.closePrivateChat(false);

    }

    render() {

        const { currentPrivateChat } = this.props;
        //console.log(currentPrivateChat);
        if(currentPrivateChat !== false) {
            return (
                <div className="private-chat-window">
                    <button
                        type="button"
                        className="btn private-chat-window-child"
                        onClick={this.closePrivateChatWindow}> close private chat
                    </button>
                    <div className="">  { this.props.currentPrivateChat } </div>
                    <div className=" private-chat-window-child scrollable">
                        <PrivateMessageHistory />
                        <PrivateMessageReceive />
                    </div>
                    <PrivateMessageSend />
                </div>
            );
        } else {
            return (
                null
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
