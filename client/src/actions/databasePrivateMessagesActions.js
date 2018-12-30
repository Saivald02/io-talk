import { DATABASE_PRIVATE_MESSAGES } from '../constants/databasePrivateMessagesConstants';
//import fetch from 'isomorphic-fetch';

export const databasePrivateMessages = ( arr ) => {
    //console.log('roomsAction rooms');
    //console.log(socket);
    //var allM = [];
    //console.log('all messages action');
    //console.log('to user: ' + user);
    //console.log(msg);
    //console.log(messageHistory);
    //allMsg = Object.keys(ro);

    return {
        type: DATABASE_PRIVATE_MESSAGES,
        payload: arr
    };
};
