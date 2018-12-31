import { UNREAD, READ } from '../constants/unreadRoomMessagesConstants';


const initialState = {
    byId: [],
    byHash: {}
}

const unreadRoomMessagesReducer = ( state = initialState, action ) => {

    // búa til key/value object eða hash-table
    // key -> roomName
    // value -> allMsg
    console.log('------- unread msg reducer ------------------');
    //console.log(state);
    //console.log(action);
    switch (action.type) {
        case UNREAD:
            //console.log('--- UNREAD-MESSAGES REDUCER ---');
            //console.log(state);
            //console.log(action);


            var bool = false;
            for(var i = 0; i < state.byId.length; i++) {
                if(state.byId[i] === action.id) {
                    bool = true;
                }
            }

            //var bool = false;
            if(bool) {
                console.log('update state');
                state.byHash[action.id] = {
                    ...state.byHash[action.id],
                    ...action.payload, counter: state.byHash[action.id].counter + 1
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
        case READ:
            //console.log('read all messages for this user');
            //console.log('clear the counter');
            var contains = false;
            for(var j = 0; j < state.byId.length; j++) {
                if(state.byId[j] === action.id) {
                    contains = true;
                }
            }

            if(contains) {
                //console.log('contains');
                state.byHash[action.id] = {
                    ...state.byHash[action.id],
                    ...action.payload, counter: state.byHash[action.id].counter = 0
                }
                return {
                    ...state
                }
            } else {
              return state;
            }

        default: return state;
    }
};

export default unreadRoomMessagesReducer;
