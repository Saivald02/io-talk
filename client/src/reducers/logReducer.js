import { LOGIN, LOGOUT } from '../constants/logConstants';


const logReducer = ( state = false, action ) => {

    //console.log('inside counter reducer -------------------------------------');
    //console.log(action);
    //console.log(action);
    //console.log(state);
    switch (action.type) {
        case LOGIN: return action.payload;
        case LOGOUT: return action.payload;
        default: return state;

    }
};

export default logReducer;
