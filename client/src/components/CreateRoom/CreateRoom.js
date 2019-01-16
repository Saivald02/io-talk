import React from 'react';

import { connect } from 'react-redux';

import SocketContext from '../../socket-context';

//import { login } from '../../actions/logActions';
import axios from "axios";

/*
import Logout from '../Logout/Logout';
import Users from '../Users/Users';
import ThisUser from '../ThisUser/ThisUser';
import Rooms from '../Rooms/Rooms';
*/
//import UsersFromDatabase from '../UsersFromDatabase/UsersFromDatabase';

export class CreateRoom extends React.Component {
    constructor() {
        super();
        this.state = {
            room: ''
        };
    }

    componentDidMount() {
        console.log('mount login');
    }

    createRoom = e => {
        e.stopPropagation();
        e.preventDefault();

        const { room } = this.state;
        //console.log(this.state);
        console.log('create room');
        //console.log(this.props.log);
        axios.post("/api/createRoom", {
            room: room,
            creator: this.props.log.username
            })
            .then((response) => {
                      if (!response.data.error) {
                          console.log('successful create room')
                          console.log(response.data);
                          //this.setState({ fireRedirect: true });

                          var newRoom = { room: room };
                          this.props.socket.emit('joinroom', newRoom, (available) => {
                              if(available) {
                                  console.log('create room success ');
                              } else {
                                  console.log('create room fail');
                              }
                          });
                      }
                  })
              .catch(error => {
                      console.log('create room error: ')
                      console.log(error)
                  })
    };

    render() {
        //const log = this.props.log;
        return (
            <div className="chatwindow-child chatwindow-child-create">
                <div className="create-input">
                    <input
                        type="text"
                        className="input-box"
                        onChange={e => this.setState({ room: e.target.value })}
                        placeholder="your new channel" />
                </div>
                <div className="create-btn">
                    <button type="button" className="btn-small" onClick={this.createRoom}>Create channel</button>
                </div>
            </div>
        );
    }
}

const ChatWithSocket = props => (
  <SocketContext.Consumer>
    {socket => <CreateRoom {...props} socket={socket} />}
  </SocketContext.Consumer>
)

const mapStateToProps = ({ log }) => {
    return { log };
}

export default connect(mapStateToProps,{ })(ChatWithSocket);
