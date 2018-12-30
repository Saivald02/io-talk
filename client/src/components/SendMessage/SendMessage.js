import React from 'react';

//import socketIOClient from "socket.io-client";

import { connect } from 'react-redux';
import { sent } from '../../actions/messageActions';

import SocketContext from '../../socket-context';

import Loading from '../Loading/Loading';

export class SendMessage extends React.Component {

    /*
    constructor() {
        super();
        this.state = {
            endpoint: "http://127.0.0.1:4001"
            //endpoint: "/"
        };
    }
    */
    componentWillUnmount() {

        //this.props.socket.close();
        console.log('---------------------- i did unmount -----------------------');
    }

    componentDidMount() {
        //this.props.sent('data');
        /*
        this.props.socket.on('user_received_msg', (data) => {
            //console.log('iceland weather update');
            //console.log(userlist);
            this.props.sent(data);
            //this.setState({ allUsers: userlist });
            console.log('he did receive');


            // 1 senda með socket
            // 2 fá svar um received
            // 3 axios og vista í gagnagrunninum

        });
        */
    }

    sendMessage() {
        console.log('sending this message');
        this.props.socket.emit('sendMessage', 'sending message from socket')
        //socket.emit("clientRender", "hello server");

    }
    render() {
        //this.props.sent('more data');
        const received = this.props.message
        console.log('render sendMessage');
        console.log(received);
        //const hvolsvollur = this.props.hvolsvollur;
        ///const selfoss = this.props.selfoss;

        if(received !== false) {
            return (
                <div>
                      something
                      <p>
                          {received}
                      </p>
                      <div>
                          <button
                              onClick={() =>
                                  this.sendMessage()
                              }
                          >
                                send
                          </button>
                      </div>
                  </div>
              );
        } else {
            return (
                <div>
                    <Loading />
                    waiting for response
                </div>
            );
        }
      }
}

const ChatWithSocket = props => (
  <SocketContext.Consumer>
    {socket => <SendMessage {...props} socket={socket} />}
  </SocketContext.Consumer>
)

const mapStateToProps = ({ message }) => {
    //console.log('--- iceland weather to props ---');
    return { message };
}

//export default Iceland;
export default connect(mapStateToProps,{ sent })(ChatWithSocket);
