import React from 'react';

import { connect } from 'react-redux';

import SocketContext from '../../socket-context';

import { login } from '../../actions/logActions';
import axios from "axios";

import Logout from '../Logout/Logout';
import Users from '../Users/Users';
import ThisUser from '../ThisUser/ThisUser';

export class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        };
    }


    componentDidMount() {
        console.log('mount login');
    }

    userLogin = e => {
        e.stopPropagation();
        e.preventDefault();
        //preventDefault();
        const { email, password } = this.state;
        //console.log(this.state);
        axios.post("/api/login", {
            email: email,
            password: password,
            })
            .then((response) => {
                      if (!response.data.error) {
                          console.log('successful sign in')
                          console.log(response.data);
                          //this.setState({ fireRedirect: true });
                          var userInfo = { email: email, log: true };
                          this.props.login(userInfo);

                          this.props.socket.emit('adduser', email, (available) => {
                                    if (available) {
                                        console.log('add user success');
                                    } else {
                                        console.log('add user fail');
                                    }
                                });
                      } else {
                          console.log('email or password is incorrect')
                      }
                  })
              .catch(error => {
                      console.log('sign in error: ')
                      console.log(error)
                  })
    };

    render() {
        const log = this.props.log;
        //console.log('render register');
        //console.log(log);
        if(log.log) {
            return (
                <div>
                    <Logout />
                    <ThisUser />
                    <Users />
                </div>
            );
        } else {
            return (
                <div className="signup-child">
                    <h2 className="signup-child-box">Login</h2>
                    <div className="input-box">
                        <div className="signup-child-box">
                            <input
                                type="text"
                                className="input-box"
                                onChange={e => this.setState({ email: e.target.value })}
                                placeholder="username" />
                        </div>
                        <div className="signup-child-box">
                            <input
                                type="text"
                                className="input-box"
                                onChange={e => this.setState({ password: e.target.value })}
                                placeholder="password" />
                        </div>
                        <div className="signup-child-box">
                            <button type="button" className="btn" onClick={this.userLogin}>Login</button>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

const ChatWithSocket = props => (
  <SocketContext.Consumer>
    {socket => <Login {...props} socket={socket} />}
  </SocketContext.Consumer>
)

const mapStateToProps = ({ log }) => {
    //console.log('--- iceland weather to props ---');
    return { log };
}

//export default Iceland;
export default connect(mapStateToProps,{ login })(ChatWithSocket);
