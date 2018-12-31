import { CURRENT_ROOM_CHAT_WINDOW, CLOSE_ROOM_CHAT_WINDOW } from '../constants/currentRoomChatConstants';


const currentRoomChatReducer = ( state = false, action ) => {

    //console.log('inside counter reducer -------------------------------------');
    //console.log(action);
    //console.log(action);
    //console.log(state);
    switch (action.type) {
        case CURRENT_ROOM_CHAT_WINDOW: return action.payload;
        case CLOSE_ROOM_CHAT_WINDOW: return action.payload;
        default: return state;

    }
};

export default currentRoomChatReducer;
