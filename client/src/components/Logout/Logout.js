import React from 'react';

import axios from "axios";
import { connect } from 'react-redux';
import { logout } from '../../actions/logActions';
import SocketContext from '../../socket-context';
export class Logout extends React.Component {

    componentDidMount() {
        console.log('mount logout');
    }

    componentWillUnmount() {
        console.log('i did unmuont -------------------');
        
        this.props.socket.off('userlist');
    }
    userLogout() {
        console.log('user logout');
        // destroy session
        // clear username in redux
        // fireRedirect to home

        axios.get('/api/logout')
            .then(response => {
                this.props.logout(response.data.success)

            })
            .catch(error => {
                console.log('log error');
                throw(error);
            });
    }

    render() {
        console.log(this.props);
        return (
              <div>
                  <h3>Logout</h3>
                  <div>
                      <button type="button" className="" onClick={() => this.userLogout()}>Logout</button>
                  </div>
              </div>
          );
      }
}

const ChatWithSocket = props => (
    <SocketContext.Consumer>
      {socket => <Logout {...props} socket={socket} />}
    </SocketContext.Consumer>
)

const mapStateToProps = ({ log }) => {
    //console.log('--- iceland weather to props ---');
    return { log };
}

export default connect(mapStateToProps,{ logout })(ChatWithSocket);
