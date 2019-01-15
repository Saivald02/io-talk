import { ALL_USERS_DATABASE } from '../constants/databaseAllUsersConstants';
//import fetch from 'isomorphic-fetch';

export const getDatabaseAllUsers = (allUsers) => {

    console.log('data base all users actions');
    return {
        type: ALL_USERS_DATABASE,
        payload: allUsers
    };
};
