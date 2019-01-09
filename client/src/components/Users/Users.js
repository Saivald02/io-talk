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

  componentWillUnmount() {
      this.props.socket.off('userlist');
  }

  componentDidMount() {
      //console.log('i did mount');

      this.props.socket.on('userlist', (userlist) => {
          console.log('userlist was updated');
          console.log(userlist);
          this.props.allUsers(userlist);
      });
  }

    render() {
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
    return { users };
}

export default connect(mapStateToProps,{ allUsers })(ChatWithSocket);
