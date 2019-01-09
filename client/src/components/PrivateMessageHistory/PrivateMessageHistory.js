import React from 'react';
import { connect } from 'react-redux';

export class PrivateMessageHistory extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.itemRefs = {};
    }

    componentDidMount() {
        //console.log('--------------------- MOUNT PrivateMessageHistory MOUNT --------------------- ');
    }

    componentDidUpdate() {
        const { databasePrivateMessages } = this.props;
        if(databasePrivateMessages !== undefined) {
            //console.log(private_messages.msg);
            if(databasePrivateMessages.length > 0) {
                const id = databasePrivateMessages.length-1;
                this.itemRefs[id].scrollIntoView();
            }
        }
    }

    componentWillUnmount() {
        //console.log('--------------------- UNMOUNT PrivateMessageHistory UNMOUNT --------------------- ');
    }


    render() {
        const { databasePrivateMessages } = this.props;
        const { username } = this.props.log;

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
