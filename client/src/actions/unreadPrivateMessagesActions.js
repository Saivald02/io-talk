import { UNREAD, READ } from '../constants/unreadPrivateMessagesConstants';
//import fetch from 'isomorphic-fetch';

export const unreadPrivateMessages = ( from, number) => {
    return {
        type: UNREAD,
        id: from,
        payload: { id: from, counter: number }
    };
};

export const readPrivateMessages = (from, number) => {
    return {
        type: READ,
        id: from,
        payload: { id: from, counter: number }
    };
};
