import { CURRENT_PRIVATE_CHAT_WINDOW, CLOSE_PRIVATE_CHAT_WINDOW } from '../constants/currentPrivateChatConstants';
//import fetch from 'isomorphic-fetch';

export const openPrivateChat = (user) => {
    //console.log('message action ');
    //console.log(msg);
    return {
        type: CURRENT_PRIVATE_CHAT_WINDOW,
        payload: user
    };
};

export const closePrivateChat = (close) => {
    //console.log('trying to close');
    //console.log(close);
    return {
        type: CLOSE_PRIVATE_CHAT_WINDOW,
        payload: close
    };
};
