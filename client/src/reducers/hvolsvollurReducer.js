import { HVOLSVOLLUR_wEATHER } from '../constants/weatherHvolsvollurConstants';

const hvolsollurReducer = ( state = false, action ) => {

    //console.log('inside counter reducer -------------------------------------');
    //console.log(action);
    //console.log(action);
    //console.log(state);
    switch (action.type) {
        case HVOLSVOLLUR_wEATHER: return action.payload;
        default: return state;
    }
};

export default hvolsollurReducer;
