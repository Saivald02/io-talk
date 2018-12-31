
import React from 'react';
//import axios from "axios";

//import socketIOClient from "socket.io-client";
//import SendMessage from '../SendMessage/SendMessage';

//import Users from '../Users/Users';

export class Messages extends React.Component {
    constructor() {
        super();
        this.state = {

        };
    }

    componentDidMount() {
        console.log('socket-io messages');
    }

    /*
    componentWillUnmount() {
        if (this.state.intervalIsSet) {
          clearInterval(this.state.intervalIsSet);
          this.setState({ intervalIsSet: null });
        }
    }
    */

    /*
    <div>
        receive message
        <Users />
        <SendMessage />
    </div>
    */
    render() {
        return (
            null
        );
    }
}

export default Messages;
