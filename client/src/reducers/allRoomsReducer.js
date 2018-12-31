import { ALL_ROOMS } from '../constants/allRoomsConstants';

const allRoomsReducer = ( state = [], action ) => {

    //console.log('--- inside all users reducer ---');
    //console.log(action);
    //console.log(action);
    //console.log(action);
    //console.log(state);
    //obj = { creator: '', chatroom: '', joinRoom: false };
    switch (action.type) {
        case ALL_ROOMS: return action.payload;
        default: return state;
    }
};

export default allRoomsReducer;
