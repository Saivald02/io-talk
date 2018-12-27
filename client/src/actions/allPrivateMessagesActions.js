import { ALL_PRIVATE_MESSAGES } from '../constants/allPrivateMessagesConstants';
//import fetch from 'isomorphic-fetch';

export const addPrivateMessage = ( user, msg ) => {
    //console.log('roomsAction rooms');
    //console.log(socket);
    //var allM = [];
    console.log('all messages action');
    console.log('to user: ' + user);
    console.log(msg);
    //console.log(messageHistory);
    //allMsg = Object.keys(ro);

    return {
        type: ALL_PRIVATE_MESSAGES,
        id: user,
        payload: { index: user, msg: msg }
    };
};
