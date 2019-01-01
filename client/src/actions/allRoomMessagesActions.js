import { ALL_ROOM_MESSAGES, CLEAR_SOCKET_ROOM_MESSAGES } from '../constants/allRoomMessagesConstants';
//import fetch from 'isomorphic-fetch';

export const addRoomMessage = ( sender, room, msgs, date) => {
    //console.log('roomsAction rooms');
    //console.log(socket);
    //var allM = [];
    console.log('all room messages action');
    //console.log('to user: ' + user);
    //console.log(msg);
    //console.log(messageHistory);
    //allMsg = Object.keys(ro);
    //var key = sender+

    var msg = []
    msg.push(msgs);
    return {
        type: ALL_ROOM_MESSAGES,
        index: room,
        payload: { sender: sender, room: room, msg: msg, date: date, test: msgs }
    };
};

export const clearSocketRoomMessages = () => {

    return {
        type: CLEAR_SOCKET_ROOM_MESSAGES,
        payload: []
    }
}
