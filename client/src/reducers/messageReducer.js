import { MESSAGE } from '../constants/messageConstants';


const messageReducer = ( state = 'empty', action ) => {

    //console.log('inside counter reducer -------------------------------------');
    //console.log(action);
    //console.log(action);
    //console.log(state);
    switch (action.type) {
        case MESSAGE: return action.payload;
        default: return state;

    }
};

export default messageReducer;
