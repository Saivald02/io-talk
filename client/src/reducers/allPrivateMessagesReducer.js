import { ALL_PRIVATE_MESSAGES } from '../constants/allPrivateMessagesConstants';

/*
const initialState = {
    privateMessages : {
        byId: {

        },
        allIds : []
    }
}
*/
const allPrivateMessagesReducer = ( state = [], action ) => {

    // búa til key/value object eða hash-table
    // key -> roomName
    // value -> allMsg
    switch (action.type) {
        case ALL_PRIVATE_MESSAGES:
        return state.concat([
        {
          msg: action.payload.msg,
          index: action.payload.index,
        }
])
        default: return state;
    }
    /*
    index: user, msg: msg
    switch (action.type) {
        case ALL_PRIVATE_MESSAGES:
            console.log('--- PRIVATE MESSAGES REDUCER ---');
            console.log(state);
            console.log(action);
            var bool = false;
            for(var i = 0; i < state.byId.length; i++) {
                if(state.byId[i] === action.id) {
                    bool = true;
                }
            }

            if(bool) {
                console.log('append to state');
                console.log(state);
                console.log(action);
                state.byHash[action.id] = {
                    ...state.byHash[action.id],
                    ...action.payload
                }
                return {
                    ...state
                }
            }  else {
                console.log('no need for update');
                return {
                    byId: [ ...state.byId, action.id],
                    byHash: {
                        ...state.byHash,
                        [action.id]: action.payload
                    }
                }
            }
        default: return state;
    }
    */
};

export default allPrivateMessagesReducer;
