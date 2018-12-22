import React from 'react';

export class Login extends React.Component {
    constructor() {
        super();
        this.state = {

        };
  }
  componentDidMount() {
      console.log('mount login');
  }

  userLogin() {
      console.log('user login');
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

export default Login;
