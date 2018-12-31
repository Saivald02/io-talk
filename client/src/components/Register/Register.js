
import React from 'react';
import axios from "axios";
import { connect } from 'react-redux';
import { login } from '../../actions/logActions';
//import { Link } from 'react-router-dom';
//import { Redirect } from 'react-router';

import SocketContext from '../../socket-context';

//import Messages from '../Messages/Messages'
//import Loading from '../Loading/Loading';
import Logout from '../Logout/Logout';

//import socketIOClient from "socket.io-client";

export class Register extends React.Component {
    constructor() {
        super();
        this.state = {
          email: null,
          username: null,
          password: null,
          passwordConfirm: null,
          fireRedirect: false
        };
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    registerPost = message => {
        const { email, username, password, passwordConfirm } = this.state;
        console.log(this.state);
        axios.post("/api/register", {
            email: email,
            username: username,
            password: password,
            passwordConf: passwordConfirm
            })
            .then((response) => {
                      if (!response.data.error) {
                          console.log('successful signup')
                          console.log(response.data);
                          //this.setState({ fireRedirect: true });
                          this.props.login(true);
                          this.props.socket.emit('adduser', this.state.username, (available) => {
                                    if (available) {
                                        console.log('add user success');
                                        console.log(this.state.username);
                                    } else {
                                        console.log('add user fail');
                                    }
                                });
                      } else {
                          console.log('username already taken')
                      }
                  })
              .catch(error => {
                      console.log('signup error: ')
                      console.log(error)
                  })
    };

    render() {
        const log = this.props.log;
        console.log('render register');
        //console.log(log);
        if(log.log) {
            return (
                <div>
                    <Logout />
                </div>
            );
        } else {
            return (
                <div className="signup-child">
                    <h2 className="signup-child-box">Register</h2>
                    <div className="signup-child-box">
                        <input
                            type="text"
                            className="input-box"
                            onChange={e => this.setState({ email: e.target.value })}
                            placeholder="email"
                        />
                    </div>
                    <div className="signup-child-box">
                        <input
                            type="text"
                            className="input-box"
                            onChange={e => this.setState({ username: e.target.value })}
                            placeholder="username"
                        />
                    </div>
                    <div className="signup-child-box">
                        <input
                            type="text"
                            className="input-box"
                            onChange={e => this.setState({ password: e.target.value })}
                            placeholder="password"
                        />
                    </div>
                    <div className="signup-child-box">
                        <input
                            type="text"
                            className="input-box"
                            onChange={e => this.setState({ passwordConfirm: e.target.value })}
                            placeholder="confirm password"
                        />
                    </div>
                    <div className="signup-child-box">
                        <button className="btn"
                            onClick={() =>
                                this.registerPost()
                            }
                        >
                              register
                        </button>
                    </div>

                </div>
            );
        }
    }
}



//export default connect(mapStateToProps, { login })(Register);

const ChatWithSocket = props => (
    <SocketContext.Consumer>
      {socket => <Register {...props} socket={socket} />}
    </SocketContext.Consumer>
)

const mapStateToProps = ({ log }) => {
    //console.log('--- iceland weather to props ---');
    return { log };
}

  //export default Iceland;
export default connect(mapStateToProps,{ login })(ChatWithSocket);
