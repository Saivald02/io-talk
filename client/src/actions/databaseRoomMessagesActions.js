import { DATABASE_ROOM_MESSAGES } from '../constants/databaseRoomMessagesConstants';
//import fetch from 'isomorphic-fetch';

export const databaseRoomMessages = ( arr ) => {
    //console.log('roomsAction rooms');
    //console.log(socket);
    //var allM = [];
    //console.log('all messages action');
    //console.log('to user: ' + user);
    //console.log(msg);
    //console.log(messageHistory);
    //allMsg = Object.keys(ro);

    return {
        type: DATABASE_ROOM_MESSAGES,
        payload: arr
    };
};
