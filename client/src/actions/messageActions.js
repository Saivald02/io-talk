import { MESSAGE } from '../constants/messageConstants';
//import fetch from 'isomorphic-fetch';

export const sent = (msg) => {
    console.log('message action ');
    console.log(msg);
    return {
        type: MESSAGE,
        payload: msg
    };
};
