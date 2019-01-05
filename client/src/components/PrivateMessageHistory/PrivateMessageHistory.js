
import React from 'react';
//import axios from "axios";
//import Loading from '../Loading/Loading';
import { connect } from 'react-redux';

//import socketIOClient from "socket.io-client";


export class PrivateMessageHistory extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.itemRefs = {};
    }

    componentDidMount() {
        //this.getDataFromDb();
        console.log('--------------------- MOUNT PrivateMessageHistory MOUNT --------------------- ');
        //this.getPrivateMessageHistory();

        /*
        if (!this.state.intervalIsSet) {
            let interval = setInterval(this.getPrivateMessageHistory, 1000);
            this.setState({ intervalIsSet: interval });
        }
        */

    }

    componentDidUpdate() {
        //const element = document.getElementById(this.state.media);
        //this.props.
        //const { currentRoomChat } = this.props;
        const { databasePrivateMessages } = this.props;
        if(databasePrivateMessages !== undefined) {
            //console.log(private_messages.msg);
            if(databasePrivateMessages.length > 0) {
                //scrollTo(room_messages.msg.length-1);
                //console.log('--------------- scrolll sssssssssssssss');
                const id = databasePrivateMessages.length-1;
                this.itemRefs[id].scrollIntoView();
            }

            //console.log(arr);
        }
        //element.scrollIntoView({behavior: 'smooth'});
    }

    componentWillUnmount() {
        /*
        if (this.state.intervalIsSet) {
          clearInterval(this.state.intervalIsSet);
          this.setState({ intervalIsSet: null });
        }
        */
        console.log('--------------------- UNMOUNT PrivateMessageHistory UNMOUNT --------------------- ');
    }


    render() {
        const { databasePrivateMessages } = this.props;
        const { username } = this.props.log;
        //const { currentPrivateChat } = this.props;
        //console.log(data);

        if(databasePrivateMessages.length <= 0) {
            return (
                null
            );
        } else {
          return (
              <div className="private-chat-window-child-text">
                  {
                      databasePrivateMessages.map((item, i) => {
                          // test
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
    }
}

const mapStateToProps = ({ log, databasePrivateMessages }) => {

    return { log, databasePrivateMessages };
}

export default connect(mapStateToProps,{ })(PrivateMessageHistory);
