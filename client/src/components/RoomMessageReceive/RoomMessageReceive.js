import React from 'react';
import { connect } from 'react-redux';

class RoomMessageReceive extends React.Component {

    componentDidCatch(error, info) {
        console.log(error, info);
    }

    componentDidMount() {


    }

    render() {

        const { currentRoomChat } = this.props;
        console.log('render room message receive ' + currentRoomChat);
        const room_messages = this.props.allRoomMessages.byHash[currentRoomChat];
        var arr = [];
        if(room_messages !== undefined) {
            //console.log(private_messages.msg);
            arr = room_messages.msg;
            //console.log(arr);
        }

        if(arr.length !== 0) {
            return (
              <div>
                { arr.map((u, i)=> <div key={ i }>{ u }</div>) }
              </div>

            );
        } else {
            return (
              null
            );
        }
    }

};

const mapStateToProps = ({ allRoomMessages, currentRoomChat, log }) => {
    //console.log('--- iceland weather to props ---');
    return { allRoomMessages, currentRoomChat, log };
}

export default connect(mapStateToProps,{ })(RoomMessageReceive);
