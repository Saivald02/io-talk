import React from 'react';
import { connect } from 'react-redux';

class RoomMessageReceive extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.itemRefs = {};
    }

    /*
    scrollTo(id) {
        this.itemRefs[id].scrollIntoView();
    }
    */
    componentDidUpdate() {
        //const element = document.getElementById(this.state.media);
        //this.props.
        const { currentRoomChat } = this.props;
        const room_messages = this.props.allRoomMessages.byHash[currentRoomChat];
        if(room_messages !== undefined) {
            //console.log(private_messages.msg);
            if(room_messages.msg.length > 0) {
                //scrollTo(room_messages.msg.length-1);
                console.log('--------------- scrolll sssssssssssssss');
                const id = room_messages.msg.length-1;
                this.itemRefs[id].scrollIntoView();
            }

            //console.log(arr);
        }
        //element.scrollIntoView({behavior: 'smooth'});
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
        // key={m.id} ref={el => (this.itemRefs[m.id] = el)}>
        if(arr.length !== 0) {
            return (
              <div>
                { arr.map((u, i)=> <div key={ i } ref={el => (this.itemRefs[i] = el) }>{ u }</div>) }
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
