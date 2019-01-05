import { ALL_USERS, ALL_USERS_REMOVE_ONE } from '../constants/allUsersConstants';


const initialUserState = {
    arr:[]
}

const allUsersReducer = ( state = initialUserState, action ) => {

    //console.log('--- inside all users reducer ---');
    //console.log(action);
    //console.log(action);
    //console.log(action);
    //console.log(state);
    //obj = { creator: '', chatroom: '', joinRoom: false };
    switch (action.type) {
        case ALL_USERS: return { ...state, arr: action.payload }
        case ALL_USERS_REMOVE_ONE:
        return {
                ...state,
                arr: state.arr.filter(item => action.payload !== item)
            }
        default: return state;
    }
};

export default allUsersReducer;
