import { SELFOSS_WEATHER } from '../constants/weatherSelfossConstants';

const selfossReducer = ( state = false, action ) => {

    //console.log('inside counter reducer -------------------------------------');
    //console.log(action);
    //console.log(action);
    //console.log(state);
    switch (action.type) {
        case SELFOSS_WEATHER: return action.payload;
        default: return state;
    }
};

export default selfossReducer;
