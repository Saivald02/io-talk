import { CURRENT_PRIVATE_CHAT_WINDOW, CLOSE_PRIVATE_CHAT_WINDOW } from '../constants/currentPrivateChatConstants';


const currentPrivateChatReducer = ( state = false, action ) => {

    //console.log('inside counter reducer -------------------------------------');
    //console.log(action);
    //console.log(action);
    //console.log(state);
    switch (action.type) {
        case CURRENT_PRIVATE_CHAT_WINDOW: return action.payload;
        case CLOSE_PRIVATE_CHAT_WINDOW: return action.payload;
        default: return state;

    }
};

export default currentPrivateChatReducer;
