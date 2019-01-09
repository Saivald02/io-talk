import React from 'react';
import axios from "axios";
import { connect } from 'react-redux';
import { login } from '../../actions/logActions';
import SocketContext from '../../socket-context';
import Logout from '../Logout/Logout';
import Users from '../Users/Users';
import ThisUser from '../ThisUser/ThisUser';
import Rooms from '../Rooms/Rooms';

export class Register extends React.Component {
    constructor() {
        super();
        this.state = {
          username: null,
          password: null,
          passwordConfirm: null,
        };
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    registerPost = message => {
        const { username, password, passwordConfirm } = this.state;
        console.log(this.state);
        axios.post("/api/register", {
            username: username,
            password: password,
            passwordConf: passwordConfirm
            })
            .then((response) => {
                      console.log(response);
                      console.log(response.data.error);
                      if (!response.data.error) {
                          console.log('successful signup')
                          console.log(response.data);
                          var userInfo = { username: username, log: true };
                          this.props.login(userInfo);

                          if(this.props.socket.connected === true) {
                              console.log('register: im connected');
                          } else {
                              console.log('register: i need to reconnect');
                              this.props.socket.open();
                          }
                          this.props.socket.emit('adduser', this.state.username, (available) => {
                                    if (available) {
                                        console.log('add user success');
                                        //console.log(this.state.username);

                                        var newRoom = { room: 'lobby'};
                                        this.props.socket.emit('joinroom', newRoom, (available) => {
                                            if(available) {
                                                console.log('join room success ');
                                            } else {
                                                console.log('join room fail');
                                            }
                                        });
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
                <div className="chatwindow">
                    <ThisUser />
                    <Logout />
                    <Users />
                    <Rooms />
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

const ChatWithSocket = props => (
    <SocketContext.Consumer>
      {socket => <Register {...props} socket={socket} />}
    </SocketContext.Consumer>
)

const mapStateToProps = ({ log }) => {
    return { log };
}

export default connect(mapStateToProps,{ login })(ChatWithSocket);
