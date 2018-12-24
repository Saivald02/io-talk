import { INCREMENT, DECREMENT } from '../constants/counterConstants';
//import fetch from 'isomorphic-fetch';

export const increment = (number) => {
    return {
        type: INCREMENT,
        payload: number
    };
};

export const decrement = (number) => {
    return {
        type: DECREMENT,
        payload: number
    };
};
