import React from 'react';
import SocketContext from '../../socket-context';
import { connect } from 'react-redux';
import { addPrivateMessage } from '../../actions/allPrivateMessagesActions';
import { unreadPrivateMessages } from '../../actions/unreadPrivateMessagesActions';

export class ThisUser extends React.Component {

    componentDidMount() {
        this.props.socket.on('recv_privatemsg', (from, recievedMsg) => {
            var msg = from +': ' + recievedMsg;
            //this.state.privateMsgHistory.push(msg);
            //console.log('did i receive msg??');
            //console.log(msg);
            //this.setState({privatemsg: msg}); // to render again
            //console.log(this.props.allPrivateMessages);
            //const arr = [];


            this.props.unreadPrivateMessages(from, 1);
            this.props.addPrivateMessage(from, this.props.log.email, msg, 1);

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
        const user = this.props.log.email;
        //console.log(this.props);
        //console.log(this.props.allUnreadPrivateMessages);
        //const { response } = this.state;
        //console.log(response);
        //console.log('render oldusel');
        //console.log(response);
        //console.log(selfoss);
        //console.log(hvols);
        //console.log(forecast[0]);
        //console.log(newUser)
        return (
            <div> I'm logged in as { user } </div>
        );
    }
}


const ChatWithSocket = props => (
    <SocketContext.Consumer>
        {socket => <ThisUser {...props} socket={socket} />}
    </SocketContext.Consumer>
)

const mapStateToProps = ({ allPrivateMessages, log, allUnreadPrivateMessages, currentPrivateChat }) => {
    //console.log('--- iceland weather to props ---');
    return { allPrivateMessages, log, allUnreadPrivateMessages, currentPrivateChat };
}

export default connect(mapStateToProps,{ addPrivateMessage, unreadPrivateMessages })(ChatWithSocket);
