import { ALL_PRIVATE_MESSAGES, CLEAR_SOCKET_PRIVATE_MESSAGES } from '../constants/allPrivateMessagesConstants';



const initialState = {
    byId: [],
    byHash : {

    },
    arr: []
}


//const initialState = [];

const allPrivateMessagesReducer = ( state = initialState, action ) => {

    // búa til key/value object eða hash-table
    // key -> roomName
    // value -> allMsg


    switch (action.type) {
        case ALL_PRIVATE_MESSAGES:
            console.log('--- PRIVATE MESSAGES REDUCER ---');
            console.log(state);
            console.log(action);
            var bool = false;

            for(var i = 0; i < state.byId.length; i++) {
                if(state.byId[i] === action.index) {
                    bool = true;
                }
            }
            if(bool) {

                let copy = Object.assign({}, state.byHash );
                console.log('add message');
                console.log(state);
                console.log(action);
                /*
                state.byHash[action.index].msg = [
                    ...state.byHash[action.index],
                    ...action.payload.msg
                    //msg: [state.byHash[action.index].msg, action.payload.msg]
                */
                    copy[
                      action.index ].msg = [
                        ...copy[ action.index ].msg, action.payload.test];

                //state.arr
                /*
                 playlistDictCopy[
                    action.playlistId ].pages = [
                      ...playlistDictCopy[ action.playlistId ].pages, action.pageId]);
                */
                return Object.assign( {}, state, { byHash: copy } );

            } else {
                console.log('no need for update');
                return {
                    byId: [ ...state.byId, action.index],
                    byHash: {
                        ...state.byHash,
                        [action.index]: action.payload
                    }//,
                    //arr: [ ...state.arr, action.payload.msg ]
                }

            }
            /*
            for(var i = 0; i < state.byId.length; i++) {
                if(state.byId[i] === action.index) {
                    bool = true;
                }
            }

            if(bool) {
                console.log('append to state');
                console.log(state);
                console.log(action);
                const newState = { ...state };
                newState.contents =
                    [
                      newState.contents[action.index],
                      {msg: newState.contents[action.index].msg, msg: action.payload}
                    ];
                return newState;

            }  else {
                console.log('no need for update');
                return {
                    byId: [ ...state.byId, action.index],
                    contents: {
                        ...state.contents,
                        [action.index]: action.payload
                    }
                }
            }
        */
        case CLEAR_SOCKET_PRIVATE_MESSAGES:
            return initialState
        default: return state;
    }

};

export default allPrivateMessagesReducer;
