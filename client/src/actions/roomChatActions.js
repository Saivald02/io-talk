import { CURRENT_ROOM_CHAT_WINDOW, CLOSE_ROOM_CHAT_WINDOW } from '../constants/currentRoomChatConstants';
//import fetch from 'isomorphic-fetch';

export const openRoomChat = (room) => {
    //console.log('message action ');
    //console.log(msg);
    return {
        type: CURRENT_ROOM_CHAT_WINDOW,
        payload: room
    };
};

export const closeRoomChat = (close) => {
    //console.log('trying to close');
    //console.log(close);
    return {
        type: CLOSE_ROOM_CHAT_WINDOW,
        payload: close
    };
};
