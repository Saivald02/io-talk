import React from 'react';

import axios from "axios";
import { connect } from 'react-redux';
import { logout } from '../../actions/logActions';
import SocketContext from '../../socket-context';

import { clearUnreadPrivateMessages } from '../../actions/unreadPrivateMessagesActions';
import { clearUnreadRoomMessages } from '../../actions/unreadRoomMessagesActions';

import { closeRoomChat } from '../../actions/roomChatActions';
import { closePrivateChat } from '../../actions/privateChatActions';

export class Logout extends React.Component {

    componentDidMount() {
        console.log('mount logout');
    }

    componentWillUnmount() {
        console.log('i did unmuont -------------------');

        this.props.socket.off('userlist');

        // hcað meir
    }

    userLogout() {
        console.log('user logout');

        axios.get('/api/logout')
            .then(response => {
                var userInfo = { username: '', log: response.data.success };

                this.props.logout(userInfo);
                this.props.closePrivateChat(false);
                this.props.closeRoomChat(false);
                this.props.clearUnreadPrivateMessages();
                this.props.clearUnreadRoomMessages();

                this.props.socket.emit('logout');
                //this.props.socket.close();
                //this.props.socket.disconnect();
            })
            .catch(error => {
                console.log('log error');
                throw(error);
            });
    }

    render() {
        console.log(this.props);
        return (
              <div className="chatwindow-child chatwindow-child-logout">
                    <button type="button" className="btn" onClick={() => this.userLogout()}>Logout</button>
              </div>
          );
      }
}

const ChatWithSocket = props => (
    <SocketContext.Consumer>
      {socket => <Logout {...props} socket={socket} />}
    </SocketContext.Consumer>
)

const mapStateToProps = ({ allPrivateMessages, allRoomMessages, log, allUnreadPrivateMessages, allUnreadRoomMessages, currentPrivateChat, currentRoomChat }) => {
    //console.log('--- iceland weather to props ---');
    return { allPrivateMessages, allRoomMessages, log, allUnreadPrivateMessages, allUnreadRoomMessages, currentPrivateChat, currentRoomChat };
}

export default connect(mapStateToProps,{ logout, clearUnreadPrivateMessages, clearUnreadRoomMessages, closeRoomChat, closePrivateChat })(ChatWithSocket);
