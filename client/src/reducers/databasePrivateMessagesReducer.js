import { DATABASE_PRIVATE_MESSAGES } from '../constants/databasePrivateMessagesConstants';

const allPrivateMessagesReducer = ( state = [], action ) => {

    // búa til key/value object eða hash-table
    // key -> roomName
    // value -> allMsg
    switch (action.type) {
        case DATABASE_PRIVATE_MESSAGES:
            return action.payload;
            default: return state;
    }
};

export default allPrivateMessagesReducer;
