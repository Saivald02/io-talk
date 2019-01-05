import React from 'react';
import SocketContext from '../../socket-context';
import { connect } from 'react-redux';
import { addPrivateMessage } from '../../actions/allPrivateMessagesActions';
import { unreadPrivateMessages } from '../../actions/unreadPrivateMessagesActions';
import { addRoomMessage } from '../../actions/allRoomMessagesActions';
import { unreadRoomMessages } from '../../actions/unreadRoomMessagesActions';

export class ThisUser extends React.Component {

    componentDidMount() {
        this.props.socket.on('recv_privatemsg', (from, recievedMsg) => {
            //var msg = from +': ' + recievedMsg;

            // this.props.addPrivateMessage(sender, receiver, msg, 1);
            if(this.props.currentPrivateChat !== from) {
                console.log('adding to unread message from ' + from);
                this.props.unreadPrivateMessages(from, 1);
            }

            this.props.addPrivateMessage(from, this.props.log.username, recievedMsg, 0);

        });

        this.props.socket.on('updatechat', (data) => {
            //var msg = from +': ' + recievedMsg;
            console.log('room message received');

            console.log(data);

            this.props.addRoomMessage(data.sender, data.room, data.message, 1);
            console.log('current room:' + data.room + ' ' + this.props.currentRoomChat);
            if(this.props.currentRoomChat !== data.room) {
                console.log('adding to unread message from ' + data.room);
                this.props.unreadRoomMessages(data.room, 1);
            }

            //this.props.addRoomMessage(from, this.props.log.username, msg, 1);

        });

        //console.log('i did mount');
        //this.props.socket.open();
        //const { endpoint } = this.state;
        //const socket = socketIOClient(endpoint);
        //this.props.socket.on("FromAPI", data => this.setState({ response: data }));

        /*
        socket.on("FromAPIHvols", data => this.setState({ hvols: data }));

        socket.on("FromAPISelf", data => this.setState({ selfoss: data }));

        socket.on("weatherForecast", data => this.setState({ forecast: data }));

        socket.on("newUser", data => this.setState({ newUser: data }));

        socket.emit("clientRender", "hello server");
        */
    }

    render() {
        //console.log(this.props);
        //console.log('render user');
        const user = this.props.log.username;

        return (
            <div className="chatwindow-child chatwindow-child-userinfo"> I'm logged in as { user } </div>
        );
    }
}


const ChatWithSocket = props => (
    <SocketContext.Consumer>
        {socket => <ThisUser {...props} socket={socket} />}
    </SocketContext.Consumer>
)

const mapStateToProps = ({ allPrivateMessages, allRoomMessages, log, allUnreadPrivateMessages, allUnreadRoomMessages, currentPrivateChat, currentRoomChat }) => {
    //console.log('--- iceland weather to props ---');
    return { allPrivateMessages, allRoomMessages, log, allUnreadPrivateMessages, allUnreadRoomMessages, currentPrivateChat, currentRoomChat };
}

export default connect(mapStateToProps,{ addPrivateMessage, unreadPrivateMessages, addRoomMessage, unreadRoomMessages })(ChatWithSocket);
