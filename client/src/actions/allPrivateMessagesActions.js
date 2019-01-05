import { ALL_PRIVATE_MESSAGES, CLEAR_SOCKET_PRIVATE_MESSAGES } from '../constants/allPrivateMessagesConstants';
//import fetch from 'isomorphic-fetch';

export const addPrivateMessage = ( sender, receiver, msgs, from) => {
    //console.log('roomsAction rooms');
    //console.log(socket);
    //var allM = [];
    //console.log('all messages action');
    //console.log('to user: ' + user);
    //console.log(msg);
    //console.log(messageHistory);
    //allMsg = Object.keys(ro);
    //var key = sender+

    var msg = []
    var obj = {sender: sender, receiver: receiver, msg: msgs, from: from};
    msg.push(obj);
    return {
        type: ALL_PRIVATE_MESSAGES,
        index: sender,
        payload: { sender: sender, receiver: receiver, msg: msg, test: msgs, from: from }
    };
};

export const clearSocketPrivateMessages = () => {

    return {
        type: CLEAR_SOCKET_PRIVATE_MESSAGES,
        payload: []
    }
}
