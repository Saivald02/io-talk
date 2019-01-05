import React from 'react';

import { connect } from 'react-redux';

import RoomMessageReceive from '../RoomMessageReceive/RoomMessageReceive';
import RoomMessageSend from '../RoomMessageSend/RoomMessageSend';

import RoomMessageHistory from '../RoomMessageHistory/RoomMessageHistory';

import { closeRoomChat } from '../../actions/roomChatActions';

class RoomMessageContainer extends React.Component {

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

    closeRoomChatWindow = e => {
        e.stopPropagation();
        e.preventDefault();
        //console.log(e.target.value);
        //console.log('clicking ' + this.props.user);
        //console.log('clikcing close chat');
        this.props.closeRoomChat(false);
    }

    render() {

        const { currentRoomChat } = this.props;
        console.log(currentRoomChat);
        if(currentRoomChat !== false) {
            return (
                <div className="private-chat-window">
                    <div className="">  { this.props.currentRoomChat } </div>
                    <div className="private-chat-window-child">
                        <button
                            type="button"
                            className="btn"
                            onClick={this.closeRoomChatWindow}> exit room
                        </button>
                    </div>

                    <div className="private-chat-window-child scrollable">
                        <RoomMessageHistory />
                        <RoomMessageReceive />

                    </div>
                    <div className="private-chat-window-child">
                        <RoomMessageSend />
                    </div>

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
const mapStateToProps = ({ currentRoomChat }) => {
    //console.log('--- iceland weather to props ---');
    return { currentRoomChat };
}

//export default Iceland;
export default connect(mapStateToProps,{ closeRoomChat })(RoomMessageContainer);

/*
PrivateMessage.propTypes = {
    username: PropTypes.string
};

PrivateMessage.contextTypes = {
    socket: PropTypes.object.isRequired
};
*/
