import React from 'react';

//import socketIOClient from "socket.io-client";

import SocketContext from '../../socket-context';
import { connect } from 'react-redux';
//import Loading from '../Loading/Loading';

export class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      response: false,
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
                  //this.props.allUsers(userlist);
                  this.setState({ allUsers: userlist });

      });
  }

    render() {
        const { allUsers } = this.state;
        console.log(allUsers);
        return (
            <div>
                <p>
                  users
                </p>
              </div>
            );
      }
  }

const ChatWithSocket = props => (
    <SocketContext.Consumer>
      {socket => <Users {...props} socket={socket} />}
    </SocketContext.Consumer>
)

const mapStateToProps = ({ iceland, selfoss, hvolsvollur }) => {
    //console.log('--- iceland weather to props ---');
    return { iceland, selfoss, hvolsvollur };
}

  //export default Iceland;
export default connect(mapStateToProps,{ })(ChatWithSocket);
