import { ALL_ROOMS_DATABASE } from '../constants/databaseAllRoomsConstants';
//import fetch from 'isomorphic-fetch';

export const getDatabaseAllRooms = (allRooms) => {
    //console.log(' --- allUsersAction rooms ---');
    //console.log(socket);
    //var allUsers = [];
    //allUsers = ;
    console.log('data base all users actions');
    return {
        type: ALL_ROOMS_DATABASE,
        payload: allRooms
    };
};
