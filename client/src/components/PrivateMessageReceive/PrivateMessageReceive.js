import React from 'react';
//import { PropTypes } from 'prop-types';



//import SocketContext from '../../socket-context';
import { connect } from 'react-redux';
class PrivateMessageReceive extends React.Component {

    componentDidCatch(error, info) {
        console.log(error, info);
    }

    componentDidMount() {
        //const { socket } = this.context;

    }

    /*
    constructor(props) {
        super(props);
        this.state = {
            privatemsg: '',
            //privateMsgHistory: [],
            //receiver: ''
        };
    }
    */

    render() {


        //let roomsList = null;
        //let showList = null;
        //const { privatemsg } = this.state;
        //console.log('render private msg');
        const { currentPrivateChat } = this.props;



        //console.log(private_messages);
        const private_messages = this.props.allPrivateMessages.byHash[currentPrivateChat];
        var arr = [];
        if(private_messages !== undefined) {

            //const private_messages = this.props.allPrivateMessages.byHash[currentPrivateChat];
            //console.log(private_messages.msg);
            arr = private_messages.msg;
            //console.log(arr);


        }

        /*
        <div>
            { this.props.allPrivateMessages.filter((u=>u.sender===this.props.currentPrivateChat) || (u=>u.index===this.props.log.email)).map((u, i)=> <div key={ i }>{ u.msg }</div>) }
        </div>

        { this.props.allPrivateMessages.currentPrivateChat.msg.map((u, i)=> <div key={ i }>{ u.msg }</div>) }

        */
        //console.log();
        /*
        const display = Object.keys(private_messages).map((d, key) => {
            return (
                <div className="">
                  <li key={key}>
                      { d.msg }
                  </li>
                </div>
                );
            });
        */
        //console.log(display);
        /*
        const renObjData = this.props.data.map(function(data, idx) {
          return <ul key={idx}>{$.map(data,(val,ind) => {
              return (<li>{val}</li>);
          }
          }</ul>;
      });

      {Object.keys(private_messages.byHash).map((item, i) => (
          <li className="" key={i}>
              <span className="">key: {i} Name: </span>
          </li>
          ))}

      </div>
      */
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
        /*
        console.log(this.props.allPrivateMessages);

        if(this.props.allPrivateMessages.byHash[this.props.currentPrivateChat] === undefined) {
            return (
                <div> nothing private chat history </div>
            );
        } else {
            return (
                <div> working </div>
            );
            /*
            return (
                this.props.allPrivateMessages.byHash[this.props.currentPrivateChat].messages.map((msgs, i) =>
                    <div key={i}>
                        { msgs.msg }
                    </div>)
            );

        }
        /*
        if(this.props.allPrivateMessages.byHash[this.props.chatroom.currRoom] === undefined) {
            return (
                <div> nothing </div>
            );
        } else {
            return (
                this.props.allPrivateMessages.byHash[this.props.chatroom.currRoom].messages.map((msgs, is) =>
                    <div key={is}>
                        { msgs.msg }
                    </div>)
            );
        }

    }
    */
};

/*
const ChatWithSocket = props => (
    <SocketContext.Consumer>
        {socket => <PrivateMessageReceive {...props} socket={socket} />}
    </SocketContext.Consumer>
)

const mapStateToProps = ({ allPrivateMessages, log }) => {
    //console.log('--- iceland weather to props ---');
    return { allPrivateMessages, log };
}
*/

const mapStateToProps = ({ allPrivateMessages, currentPrivateChat, log }) => {
    //console.log('--- iceland weather to props ---');
    return { allPrivateMessages, currentPrivateChat, log };
}

//export default Iceland;
export default connect(mapStateToProps,{ })(PrivateMessageReceive);

/*
PrivateMessage.propTypes = {
    username: PropTypes.string
};

PrivateMessage.contextTypes = {
    socket: PropTypes.object.isRequired
};
*/
