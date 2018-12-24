import { INCREMENT, DECREMENT } from '../constants/counterConstants';


const counterReducer = ( state = 0, action ) => {

    //console.log('inside counter reducer -------------------------------------');
    //console.log(action);
    //console.log(action);
    //console.log(state);
    switch (action.type) {
        case INCREMENT: return state + action.payload;
        case DECREMENT: return state - action.payload;
        default: return state;

    }
};

export default counterReducer;
