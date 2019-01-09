import React from 'react';
import { connect } from 'react-redux';

class PrivateMessageReceive extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.itemRefs = {};
    }

    componentDidCatch(error, info) {
        console.log(error, info);
    }

    componentDidMount() {


    }


    componentDidUpdate() {
        const { currentPrivateChat } = this.props;
        const private_messages = this.props.allPrivateMessages.byHash[currentPrivateChat];
        if(private_messages !== undefined) {
            //console.log(private_messages.msg);
            if(private_messages.msg.length > 0) {
                const id = private_messages.msg.length-1;
                this.itemRefs[id].scrollIntoView();
            }
        }
    }

    render() {

        const { currentPrivateChat } = this.props;
        const private_messages = this.props.allPrivateMessages.byHash[currentPrivateChat];
        var arr = [];

        if(private_messages !== undefined) {
            arr = private_messages.msg;
            console.log(arr);
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
                          if(item.from === 1) {
                            return (
                                <p className="sender" key={i} ref={el => (this.itemRefs[i] = el) }> { item.receiver }: { item.msg } </p>
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

const mapStateToProps = ({ allPrivateMessages, currentPrivateChat, log }) => {
    return { allPrivateMessages, currentPrivateChat, log };
}

export default connect(mapStateToProps,{ })(PrivateMessageReceive);
