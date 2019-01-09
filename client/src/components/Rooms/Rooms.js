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

  componentWillUnmount() {
      this.props.socket.off('roomlist');
  }

  componentDidMount() {

      this.props.socket.on('roomlist', (roomlist) => {
          console.log('roomlist was updated');
          console.log(roomlist);
          this.props.allRooms(roomlist);
      });
  }

    render() {
        const { rooms } = this.props;
        //console.log(rooms);
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
    return { rooms };
}

export default connect(mapStateToProps,{ allRooms })(ChatWithSocket);
