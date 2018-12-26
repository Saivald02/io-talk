import React from 'react';

import { connect } from 'react-redux';
import SocketContext from '../../socket-context';

export class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            username: ''
        };
  }
  componentDidMount() {
      console.log('mount login');
  }

  userLogin() {
      console.log('user login');


      // 1 axios login
      // 2 get axios response
      // 3 if axios success -> this.props.socket.emit add user
      /*
      this.props.socket.emit('adduser', this.state.username, (available) => {
                if (available) {
                    console.log('add user success');
                    console.log(this.state.username);
                    //this.setState({ userStatus: true });


                    const username = this.state.username;
                    //console.log(username);

                    // action functions
                    //this.props.username(username);
                    //this.props.logIn(true);
                    /*
                    socket.on('userlist', (userlist) => {
                        console.log('userlist was updated');
                        console.log(userlist);
                        //this.setState({ allUsers: userlist });

                    });
                    
                } else {
                    console.log('add user fail');
                }
            });
        */
  }
  render() {
      return (
            <div>
              <h3>Login</h3>
              <div className="input-box">
                  <input
                      type="text"
                      className="input input-big"
                      onInput={(e) => this.setState({ username: e.target.value })} />
                  <button type="button" className="btn pull-left" onClick={() => this.userLogin()}>Login</button>
                </div>
            </div>
        );
    }
}

const ChatWithSocket = props => (
  <SocketContext.Consumer>
    {socket => <Login {...props} socket={socket} />}
  </SocketContext.Consumer>
)

const mapStateToProps = ({ message }) => {
    //console.log('--- iceland weather to props ---');
    return { message };
}

//export default Iceland;
export default connect(mapStateToProps,{ })(ChatWithSocket);
