import React from 'react';
//import { PropTypes } from 'prop-types';



//import SocketContext from '../../socket-context';
import { connect } from 'react-redux';
class PrivateMessageReceive extends React.Component {

    componentDidCatch(error, info) {
        console.log(error, info);
    }

    componentDidMount() {
        //const { socket } = this.context;

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

    render() {


        //let roomsList = null;
        //let showList = null;
        //const { privatemsg } = this.state;
        console.log('render private msg');

        return (
          <ul>
              { this.props.allPrivateMessages.filter(u=>u.index===this.props.currentPrivateChat).map((u, i)=><li key={i}>{u.msg}</li>) }
          </ul>
        );
    }
        /*
        console.log(this.props.allPrivateMessages);

        if(this.props.allPrivateMessages.byHash[this.props.currentPrivateChat] === undefined) {
            return (
                <div> nothing private chat history </div>
            );
        } else {
            return (
                <div> working </div>
            );
            /*
            return (
                this.props.allPrivateMessages.byHash[this.props.currentPrivateChat].messages.map((msgs, i) =>
                    <div key={i}>
                        { msgs.msg }
                    </div>)
            );

        }
        /*
        if(this.props.allPrivateMessages.byHash[this.props.chatroom.currRoom] === undefined) {
            return (
                <div> nothing </div>
            );
        } else {
            return (
                this.props.allPrivateMessages.byHash[this.props.chatroom.currRoom].messages.map((msgs, is) =>
                    <div key={is}>
                        { msgs.msg }
                    </div>)
            );
        }

    }
    */
};

/*
const ChatWithSocket = props => (
    <SocketContext.Consumer>
        {socket => <PrivateMessageReceive {...props} socket={socket} />}
    </SocketContext.Consumer>
)

const mapStateToProps = ({ allPrivateMessages, log }) => {
    //console.log('--- iceland weather to props ---');
    return { allPrivateMessages, log };
}
*/

const mapStateToProps = ({ allPrivateMessages, currentPrivateChat }) => {
    //console.log('--- iceland weather to props ---');
    return { allPrivateMessages, currentPrivateChat };
}

//export default Iceland;
export default connect(mapStateToProps,{ })(PrivateMessageReceive);

/*
PrivateMessage.propTypes = {
    username: PropTypes.string
};

PrivateMessage.contextTypes = {
    socket: PropTypes.object.isRequired
};
*/
