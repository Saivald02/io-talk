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

    closeRoomChatWindow = e => {
        e.stopPropagation();
        e.preventDefault();
        this.props.closeRoomChat(false);
    }

    render() {
        const { currentRoomChat } = this.props;
        //console.log(currentRoomChat);
        if(currentRoomChat !== false) {
            return (
                <div className="chatwindow-child chatwindow-child-room">
                    <div className="private-chat-window-child">
                        <div className="chat-top">
                            <div className="chat-top-right"> { this.props.currentRoomChat } </div>
                            <div className="chat-top-left">
                                <button
                                    type="button"
                                    className="btn-small"
                                    onClick={this.closeRoomChatWindow}> X
                                </button>
                            </div>
                        </div>
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

const mapStateToProps = ({ currentRoomChat }) => {
    return { currentRoomChat };
}

export default connect(mapStateToProps,{ closeRoomChat })(RoomMessageContainer);
