import React from 'react';
import { connect } from 'react-redux';

class RoomMessageReceive extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.itemRefs = {};
    }

    componentDidUpdate() {
        const { currentRoomChat } = this.props;
        const room_messages = this.props.allRoomMessages.byHash[currentRoomChat];
        if(room_messages !== undefined) {

            if(room_messages.msg.length > 0) {
                const id = room_messages.msg.length-1;
                this.itemRefs[id].scrollIntoView();
            }
        }
    }

    render() {
        const { currentRoomChat } = this.props;
        const { username } = this.props.log;
        const room_messages = this.props.allRoomMessages.byHash[currentRoomChat];
        var arr = [];
        console.log(room_messages);
        if(room_messages !== undefined) {
            arr = room_messages.msg;
        }

        if(arr.length <= 0) {
            return (
                null
            );
        } else {
            return (
                <div className="private-chat-window-child-text">
                    {
                        arr.map((item, i) => {
                            // test
                            if(item.sender === username) {
                              return (
                                  <p className="sender" key={i} ref={el => (this.itemRefs[i] = el) }> { item.sender }: { item.msg } </p>
                              )
                            } else {
                                return (
                                  <p className="others" key={i} ref={el => (this.itemRefs[i] = el) }> { item.sender }: { item.msg } </p>
                                )
                            }
                        }
                      )
                    }
                </div>
            );
        }
    }
};

const mapStateToProps = ({ allRoomMessages, currentRoomChat, log }) => {
    return { allRoomMessages, currentRoomChat, log };
}

export default connect(mapStateToProps,{ })(RoomMessageReceive);
