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
        //const element = document.getElementById(this.state.media);
        //this.props.
        const { currentPrivateChat } = this.props;
        const private_messages = this.props.allPrivateMessages.byHash[currentPrivateChat];
        if(private_messages !== undefined) {
            //console.log(private_messages.msg);
            if(private_messages.msg.length > 0) {
                //scrollTo(room_messages.msg.length-1);
                //console.log('--------------- scrolll sssssssssssssss');
                const id = private_messages.msg.length-1;
                this.itemRefs[id].scrollIntoView();
            }

            //console.log(arr);
        }
        //element.scrollIntoView({behavior: 'smooth'});
    }

    render() {

        const { currentPrivateChat } = this.props;
        const private_messages = this.props.allPrivateMessages.byHash[currentPrivateChat];
        var arr = [];
        //const { username } = this.props.log;

        if(private_messages !== undefined) {
            //console.log(private_messages.msg);
            arr = private_messages.msg;
            console.log(arr);
        }

        //return (null );

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
        /*
        if(arr.length !== 0) {
            return (
              <div className="private-chat-window-child-text">
                { arr.map((u, i)=> <p key={ i } ref={el => (this.itemRefs[i] = el) }>{ u }</p>) }
              </div>

            );
        } else {
            return (
              null
            );
        }
        */
    }

};

const mapStateToProps = ({ allPrivateMessages, currentPrivateChat, log }) => {
    //console.log('--- iceland weather to props ---');
    return { allPrivateMessages, currentPrivateChat, log };
}

export default connect(mapStateToProps,{ })(PrivateMessageReceive);
