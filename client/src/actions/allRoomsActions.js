import { ALL_ROOMS } from '../constants/allRoomsConstants';
//import fetch from 'isomorphic-fetch';

export const allRooms = (rooms) => {
    //console.log(' --- allUsersAction rooms ---');
    //console.log(socket);
    //var allUsers = [];
    //allUsers = ;
    var allRooms = [];
    allRooms = Object.keys(rooms);
    return {
        type: ALL_ROOMS,
        payload: allRooms
    };
};
