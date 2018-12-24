import { LOGOUT, LOGIN } from '../constants/logConstants';
//import fetch from 'isomorphic-fetch';

export const login = (bool) => {
    return {
        type: LOGIN,
        payload: bool
    };
};

export const logout = (bool) => {
    return {
        type: LOGOUT,
        payload: bool
    };
};
