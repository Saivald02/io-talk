
import React from 'react';
//import axios from "axios";
//import Loading from '../Loading/Loading';
import { connect } from 'react-redux';

//import socketIOClient from "socket.io-client";


export class RoomMessageHistory extends React.Component {

    constructor() {
        super();
        this.state = {
            data: []
        };
    }
    componentDidMount() {
        //this.getDataFromDb();
        console.log('--------------------- MOUNT Room MessageHistory MOUNT --------------------- ');
        //this.getPrivateMessageHistory();

        /*
        if (!this.state.intervalIsSet) {
            let interval = setInterval(this.getPrivateMessageHistory, 1000);
            this.setState({ intervalIsSet: interval });
        }
        */

    }

    componentWillUnmount() {
        /*
        if (this.state.intervalIsSet) {
          clearInterval(this.state.intervalIsSet);
          this.setState({ intervalIsSet: null });
        }
        */
        console.log('--------------------- UNMOUNT Room MessageHistory UNMOUNT --------------------- ');
    }

    getPrivateMessageHistory() {
        /*
        const sender = this.props.log.email;
        const receiver = this.props.currentPrivateChat;
        console.log('get private message history');

        console.log('sender: ' + sender);
        console.log('receiver: ' + receiver);
        axios.get('/api/getPrivateMessageHistory', {
            params: {
              sender: sender,
              receiver: receiver
            }
        })
        .then((response) => {
            console.log(response.data);
            console.log(response.data.data);
            var sorted = response.data.data.sort((a, b) => a.date > b.date);
            //this.setState({data: sorted});



        })
        .catch(function (error) {
          console.log(error);
        });
        */
    }


    render() {
        const { databaseRoomMessages } = this.props;
        const { currentRoomChat } = this.props;
        //console.log(data);
        if(databaseRoomMessages.length <= 0) {
            return (
                <div> send { currentRoomChat } a messsage </div>
            );
        } else {
          return (
              <div>
                  <div>
                      { databaseRoomMessages.map((item, i) => (
                              <div key={i}>{ item.message }</div>
                        )) }
                  </div>
              </div>
          );
        }

    }
}

const mapStateToProps = ({ log, currentRoomChat, databaseRoomMessages }) => {

    return { log, currentRoomChat, databaseRoomMessages };
}

export default connect(mapStateToProps,{ })(RoomMessageHistory);
