import React from 'react';
import { connect } from 'react-redux';

class PrivateMessageReceive extends React.Component {

    componentDidCatch(error, info) {
        console.log(error, info);
    }

    componentDidMount() {


    }

    render() {

        const { currentPrivateChat } = this.props;
        const private_messages = this.props.allPrivateMessages.byHash[currentPrivateChat];
        var arr = [];
        if(private_messages !== undefined) {
            //console.log(private_messages.msg);
            arr = private_messages.msg;
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

const mapStateToProps = ({ allPrivateMessages, currentPrivateChat, log }) => {
    //console.log('--- iceland weather to props ---');
    return { allPrivateMessages, currentPrivateChat, log };
}

export default connect(mapStateToProps,{ })(PrivateMessageReceive);
