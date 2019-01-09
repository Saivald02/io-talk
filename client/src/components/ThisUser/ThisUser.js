import React from 'react';
import SocketContext from '../../socket-context';
import { connect } from 'react-redux';
import { addPrivateMessage } from '../../actions/allPrivateMessagesActions';
import { unreadPrivateMessages } from '../../actions/unreadPrivateMessagesActions';
import { addRoomMessage } from '../../actions/allRoomMessagesActions';
import { unreadRoomMessages } from '../../actions/unreadRoomMessagesActions';

export class ThisUser extends React.Component {

    componentWillUnmount() {
        this.props.socket.off('userlist');
        this.props.socket.off('recv_privatemsg');
        this.props.socket.off('updatechat');
    }

    componentDidMount() {
        this.props.socket.on('recv_privatemsg', (from, recievedMsg) => {
            if(this.props.currentPrivateChat !== from) {
                console.log('adding to unread message from ' + from);
                this.props.unreadPrivateMessages(from, 1);
            }

            this.props.addPrivateMessage(from, this.props.log.username, recievedMsg, 0);
        });

        this.props.socket.on('updatechat', (data) => {
            console.log('room message received');
            //console.log(data);
            this.props.addRoomMessage(data.sender, data.room, data.message, 0);
            console.log('current room:' + data.room + ' ' + this.props.currentRoomChat);
            if(this.props.currentRoomChat !== data.room) {
                console.log('adding to unread message from ' + data.room);
                this.props.unreadRoomMessages(data.room, 1);
            }
        });
    }

    render() {
        const user = this.props.log.username;

        return (
            <div className="chatwindow-child chatwindow-child-userinfo"> { user } </div>
        );
    }
}

const ChatWithSocket = props => (
    <SocketContext.Consumer>
        {socket => <ThisUser {...props} socket={socket} />}
    </SocketContext.Consumer>
)

const mapStateToProps = ({ allPrivateMessages, allRoomMessages, log, allUnreadPrivateMessages, allUnreadRoomMessages, currentPrivateChat, currentRoomChat }) => {
    return { allPrivateMessages, allRoomMessages, log, allUnreadPrivateMessages, allUnreadRoomMessages, currentPrivateChat, currentRoomChat };
}

export default connect(mapStateToProps,{ addPrivateMessage, unreadPrivateMessages, addRoomMessage, unreadRoomMessages })(ChatWithSocket);
