import { ALL_USERS } from '../constants/allUsersConstants';
//import fetch from 'isomorphic-fetch';

export const allUsers = (allUsers) => {
    //console.log(' --- allUsersAction rooms ---');
    //console.log(socket);
    //var allUsers = [];
    //allUsers = ;

    return {
        type: ALL_USERS,
        payload: allUsers
    };
};
