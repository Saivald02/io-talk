import { DATABASE_ROOM_MESSAGES } from '../constants/databaseRoomMessagesConstants';

const allRoomMessagesReducer = ( state = [], action ) => {

    // búa til key/value object eða hash-table
    // key -> roomName
    // value -> allMsg
    switch (action.type) {
        case DATABASE_ROOM_MESSAGES:
            return action.payload;
            default: return state;
    }
};

export default allRoomMessagesReducer;
