import { ICELAND_wEATHER } from '../constants/weatherIcelandConstants';

const icelandReducer = ( state = false, action ) => {

    //console.log('inside counter reducer -------------------------------------');
    //console.log(action);
    //console.log(action);
    //console.log(state);
    switch (action.type) {
        case ICELAND_wEATHER: return action.payload;
        default: return state;
    }
};

export default icelandReducer;
