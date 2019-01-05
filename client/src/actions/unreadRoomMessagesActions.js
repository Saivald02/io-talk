import { UNREAD, READ, CLEAR } from '../constants/unreadRoomMessagesConstants';
//import fetch from 'isomorphic-fetch';

export const unreadRoomMessages = ( from, number) => {
    return {
        type: UNREAD,
        id: from,
        payload: { id: from, counter: number }
    };
};

export const readRoomMessages = (from, number) => {
    return {
        type: READ,
        id: from,
        payload: { id: from, counter: number }
    };
};

export const clearUnreadRoomMessages = () => {
    return {
        type: CLEAR,
        id: null,
        payload: null
    };
};
