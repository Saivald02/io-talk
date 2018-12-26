import { ALL_USERS } from '../constants/allUsersConstants';

const allUsersReducer = ( state = [], action ) => {

    //console.log('--- inside all users reducer ---');
    //console.log(action);
    //console.log(action);
    //console.log(action);
    //console.log(state);
    //obj = { creator: '', chatroom: '', joinRoom: false };
    switch (action.type) {
        case ALL_USERS: return action.payload;
        default: return state;
    }
};

export default allUsersReducer;
