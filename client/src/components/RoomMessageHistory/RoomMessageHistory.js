import React from 'react';
import { connect } from 'react-redux';

export class RoomMessageHistory extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.itemRefs = {};
    }
    componentDidMount() {
        console.log('--------------------- MOUNT Room MessageHistory MOUNT --------------------- ');
    }

    componentWillUnmount() {
        console.log('--------------------- UNMOUNT Room MessageHistory UNMOUNT --------------------- ');
    }

    componentDidUpdate() {

        const { databaseRoomMessages } = this.props;
        if(databaseRoomMessages !== undefined) {
            if(databaseRoomMessages.length > 0) {
                const id = databaseRoomMessages.length-1;
                this.itemRefs[id].scrollIntoView();
            }
        }
    }

    render() {
        const { databaseRoomMessages } = this.props;
        const { username } = this.props.log;

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

const mapStateToProps = ({ log, currentRoomChat, databaseRoomMessages }) => {
    return { log, currentRoomChat, databaseRoomMessages };
}

export default connect(mapStateToProps,{ })(RoomMessageHistory);
