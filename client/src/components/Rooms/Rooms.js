import React from 'react';

//import socketIOClient from "socket.io-client";

import { allRooms } from '../../actions/allRoomsActions';

import RoomMessageContainer from '../RoomMessageContainer/RoomMessageContainer';

import SocketContext from '../../socket-context';
import { connect } from 'react-redux';
//import Loading from '../Loading/Loading';

//import GetAll from '../GetAll/GetAll';
import Room from '../Room/Room';

export class Rooms extends React.Component {
  /*
  constructor() {
    super();
    this.state = {
      //response: false,
      //selfoss: false,
      //hvols: false,

      //newUser: false,
      //endpoint: "http://127.0.0.1:4001"
      //endpoint: "/"
    };

  }
  */
  componentDidMount() {


      //console.log('i did mount');
      //this.props.socket.open();
      //const { endpoint } = this.state;
      //const socket = socketIOClient(endpoint);
      //this.props.socket.on("FromAPI", data => this.setState({ response: data }));

      this.props.socket.on('roomlist', (roomlist) => {
          console.log('roomlist was updated');
          console.log(roomlist);
          this.props.allRooms(roomlist);
          /*
          // https://stackoverflow.com/questions/23092624/socket-io-removing-specific-listener
          //To unsubscribe all listeners of an event
          socket.off('event-name');

          //to unsubscribe a certain listener
          //socket.off('event-name', listener);


          //this.props.socket.off('userlist');
          //this.setState({ allUsers: userlist });
          */
      });

  }

    render() {
        //const { allUsers } = this.props;
        //console.log(allUsers);
        const { rooms } = this.props;
        console.log(rooms);
        return (
            <div className="chatwindow-child chatwindow-child-rooms">
                { rooms.map((one, i) => (<Room key={i} room={one} />)) }
                <RoomMessageContainer />
            </div>
        );
      }
  }

const ChatWithSocket = props => (
    <SocketContext.Consumer>
      {socket => <Rooms {...props} socket={socket} />}
    </SocketContext.Consumer>
)

const mapStateToProps = ({ rooms }) => {
    //console.log('--- iceland weather to props ---');
    return { rooms };
}

export default connect(mapStateToProps,{ allRooms })(ChatWithSocket);
