
import React from 'react';
import axios from "axios";
import { connect } from 'react-redux';
import { login } from '../../actions/logActions';
//import { Link } from 'react-router-dom';
//import { Redirect } from 'react-router';

import SocketContext from '../../socket-context';

import Messages from '../Messages/Messages'
import Loading from '../Loading/Loading';
import Logout from '../Logout/Logout';
import Login from '../Login/Login';
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

        /*
        this.getDataFromDb();

        if (!this.state.intervalIsSet) {
            let interval = setInterval(this.getDataFromDb, 1000);
            this.setState({ intervalIsSet: interval });
        }
        */
        //console.log('');

    }

    componentWillUnmount() {
        /*
        if (this.state.intervalIsSet) {
          clearInterval(this.state.intervalIsSet);
          this.setState({ intervalIsSet: null });
        }
        */
    }

    /*
    // our first get method that uses our backend api to
    // fetch data from our data base
    getDataFromDb = () => {
      fetch("/api/getData")
        .then(data => data.json())
        .then(res => this.setState({ data: res.data }));
    };
    */


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
                                      //this.setState({ userStatus: true });


                                      //const username = this.state.username;
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
                                      */
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
        console.log(log);
        if(log) {
            return (
                <div>
                    <Loading />
                    <Logout />
                </div>
            );
        } else {
            return (
                <div>
                    <Login />
                    <div style={{ padding: "10px" }}>
                        <input
                            type="text"
                            onChange={e => this.setState({ email: e.target.value })}
                            placeholder="email"
                            style={{ width: "200px" }}
                        />
                    </div>
                    <div style={{ padding: "10px" }}>
                        <input
                            type="text"
                            style={{ width: "200px" }}
                            onChange={e => this.setState({ username: e.target.value })}
                            placeholder="username"
                        />
                    </div>
                    <div style={{ padding: "10px" }}>
                        <input
                            type="text"
                            style={{ width: "200px" }}
                            onChange={e => this.setState({ password: e.target.value })}
                            placeholder="password"
                        />
                    </div>
                    <div style={{ padding: "10px" }}>
                        <input
                            type="text"
                            style={{ width: "200px" }}
                            onChange={e => this.setState({ passwordConfirm: e.target.value })}
                            placeholder="confirm password"
                        />
                    </div>
                    <div>
                        <button
                            onClick={() =>
                                this.registerPost()
                            }
                        >
                              register
                        </button>
                    </div>
                    <Messages />
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
