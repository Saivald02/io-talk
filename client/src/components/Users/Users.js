import React from 'react';

//import socketIOClient from "socket.io-client";

import { allUsers } from '../../actions/allUsersActions';

import PrivateMessageContainer from '../PrivateMessageContainer/PrivateMessageContainer';

import SocketContext from '../../socket-context';
import { connect } from 'react-redux';
//import Loading from '../Loading/Loading';

//import GetAll from '../GetAll/GetAll';
import User from '../User/User';

export class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      //response: false,
      //selfoss: false,
      //hvols: false,

      //newUser: false,
      //endpoint: "http://127.0.0.1:4001"
      //endpoint: "/"
    };
  }
  componentDidMount() {
      console.log('i did mount');
      //this.props.socket.open();
      //const { endpoint } = this.state;
      //const socket = socketIOClient(endpoint);
      //this.props.socket.on("FromAPI", data => this.setState({ response: data }));

      this.props.socket.on('userlist', (userlist) => {
          console.log('userlist was updated');
          console.log(userlist);
          this.props.allUsers(userlist);
          /*
          // https://stackoverflow.com/questions/23092624/socket-io-removing-specific-listener
          //To unsubscribe all listeners of an event
          socket.off('event-name');

          //to unsubscribe a certain listener
          socket.off('event-name', listener);
          */

          //this.props.socket.off('userlist');
          //this.setState({ allUsers: userlist });

      });
  }

    render() {
        //const { allUsers } = this.props;
        //console.log(allUsers);
        const { users } = this.props;
        console.log('------ render users -------');
        console.log(users);
        if(users.arr.length !== 0) {
            return (
                <div className="chatwindow-child chatwindow-child-users">
                    { users.arr.map((one, i) => (<User key={i} user={one} />)) }
                    <PrivateMessageContainer />
                </div>
            );
        } else {
            return null;
        }

      }
  }

const ChatWithSocket = props => (
    <SocketContext.Consumer>
      {socket => <Users {...props} socket={socket} />}
    </SocketContext.Consumer>
)

const mapStateToProps = ({ users }) => {
    //console.log('--- iceland weather to props ---');
    return { users };
}

  //export default Iceland;
export default connect(mapStateToProps,{ allUsers })(ChatWithSocket);
