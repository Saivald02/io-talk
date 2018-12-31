import React from 'react';
//import { PropTypes } from 'prop-types';
import Login from '../Login/Login';
import Register from '../Register/Register';


import { connect } from 'react-redux';

import Logout from '../Logout/Logout';
import Users from '../Users/Users';
import ThisUser from '../ThisUser/ThisUser';

export class SignInUpContainer extends React.Component {

    componentDidMount() {
        //console.log('mount login');
    }

    render() {
        const log = this.props.log;
        //console.log('render register');
        console.log(log);
        console.log(log.log);
        if(log.log === true) {
            return (
                <div>
                    <Logout />
                    <ThisUser />
                    <Users />

                </div>
            );
        } else {
            return (
                <div className="signup">
                    <Register />
                    <Login />
                </div>
            );
        }
    }
}

const mapStateToProps = ({ log }) => {
    //console.log('--- iceland weather to props ---');
    return { log };
}

//export default Iceland;
export default connect(mapStateToProps,{ })(SignInUpContainer);
