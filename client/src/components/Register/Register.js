
import React from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
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
                        this.setState({ fireRedirect: true });
                    } else {
                        console.log('username already taken')
                    }
                })
            .catch(error => {
                    console.log('signup error: ')
                    console.log(error)
                })
  };


  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
    render() {
        return (
            <div>
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
                {this.state.fireRedirect && <Redirect to='/dashboard' push={true} />}
            </div>
        );
    }
}

export default Register;
