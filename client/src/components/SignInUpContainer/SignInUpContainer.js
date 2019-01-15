import React from 'react';
import Login from '../Login/Login';
import Register from '../Register/Register';
import { connect } from 'react-redux';
import Logout from '../Logout/Logout';
import Users from '../Users/Users';
import ThisUser from '../ThisUser/ThisUser';
import AllUsers from '../AllUsers/AllUsers';
import Rooms from '../Rooms/Rooms';
import CreateRoom from '../CreateRoom/CreateRoom';
import RoomMessageContainer from '../RoomMessageContainer/RoomMessageContainer';
import PrivateMessageContainer from '../PrivateMessageContainer/PrivateMessageContainer';
//import AllRooms from '../AllRooms/AllRooms';
//<AllRooms />

export class SignInUpContainer extends React.Component {

    componentDidMount() {

    }

    render() {
        const log = this.props.log;
        //console.log('render register');
        console.log(log);
        console.log(log.log);
        if(log.log === true) {
            return (
                <div className="chatwindow">
                    <ThisUser />
                    <Logout />
                    <Users />
                    <Rooms />
                    <RoomMessageContainer />
                    <PrivateMessageContainer />
                    <CreateRoom />
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
    return { log };
}

export default connect(mapStateToProps,{ })(SignInUpContainer);
