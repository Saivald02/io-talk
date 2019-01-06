
import React from 'react';
//import axios from "axios";
//import Loading from '../Loading/Loading';
import { connect } from 'react-redux';

//import socketIOClient from "socket.io-client";


export class RoomMessageHistory extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.itemRefs = {};
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
        const sender = this.props.log.username;
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


    componentDidUpdate() {
        //const element = document.getElementById(this.state.media);
        //this.props.
        //const { currentRoomChat } = this.props;
        const { databaseRoomMessages } = this.props;
        if(databaseRoomMessages !== undefined) {
            //console.log(private_messages.msg);
            if(databaseRoomMessages.length > 0) {
                //scrollTo(room_messages.msg.length-1);
                //console.log('--------------- scrolll sssssssssssssss');
                const id = databaseRoomMessages.length-1;
                this.itemRefs[id].scrollIntoView();
            }

            //console.log(arr);
        }
        //element.scrollIntoView({behavior: 'smooth'});
    }

    render() {
        const { databaseRoomMessages } = this.props;
        //const { currentRoomChat } = this.props;
        const { username } = this.props.log;
        //console.log(data);
        if(databaseRoomMessages.length <= 0) {
            return (
                null
            );
        } else {
          return (
            <div className="private-chat-window-child-text">
                {
                    databaseRoomMessages.map((item, i) => {
                          if(item.sender === username) {
                            return (
                                <p className="sender" key={i} ref={el => (this.itemRefs[i] = el) }>{ item.sender }:{ item.message }</p>
                            )
                          } else {
                              return (
                                <p className="others" key={i} ref={el => (this.itemRefs[i] = el) }>{ item.sender }: { item.message }</p>
                              )
                          }
                      }
                  )
            }
            </div>
          );
        }
    }
}

/*
if(databasePrivateMessages.length <= 0) {
    return (
        null
    );
} else {
    return (
        <div className="private-chat-window-child-text">
            {
                databasePrivateMessages.map((item, i) => {
                    if(item.sender === username) {
                      return (
                          <p className="sender" key={i} ref={el => (this.itemRefs[i] = el) }>{item.sender}: { item.message}</p>
                      )
                    } else {
                        return (
                          <p className="others" key={i} ref={el => (this.itemRefs[i] = el) }>{item.sender}: { item.message}</p>
                        )
                    }
                }
              )
            }
        </div>
    );
}
*/
const mapStateToProps = ({ log, currentRoomChat, databaseRoomMessages }) => {

    return { log, currentRoomChat, databaseRoomMessages };
}

export default connect(mapStateToProps,{ })(RoomMessageHistory);
