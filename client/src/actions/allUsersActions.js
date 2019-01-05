import { ALL_USERS, ALL_USERS_REMOVE_ONE } from '../constants/allUsersConstants';
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

export const allUsersRemove = (userToRemove) => {
    //console.log('------------------ remove one user ---------------');
    return {
        type: ALL_USERS_REMOVE_ONE,
        payload: userToRemove
    };
};
