import { ALL_USERS_DATABASE } from '../constants/databaseAllUsersConstants';


const initialUserState = {
    arr:[]
}

const databaseAllUsersReducer = ( state = initialUserState, action ) => {

    console.log('all users database reducer');
    switch (action.type) {
        case ALL_USERS_DATABASE: return { ...state, arr: action.payload }
        default: return state;
    }
};

export default databaseAllUsersReducer;
