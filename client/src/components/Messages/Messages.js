
import React from 'react';
//import axios from "axios";

//import socketIOClient from "socket.io-client";


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

    render() {
        return (
            <div>
                receive message
            </div>
        );
    }
}

export default Messages;
