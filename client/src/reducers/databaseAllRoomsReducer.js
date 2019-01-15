import { ALL_ROOMS_DATABASE } from '../constants/databaseAllRoomsConstants';


const initialRoomsState = {
    arr:[]
}

const databaseAllRoomsReducer = ( state = initialRoomsState, action ) => {

    console.log('all uers database reducer');
    switch (action.type) {
        case ALL_ROOMS_DATABASE: return { ...state, arr: action.payload }
        default: return state;
    }
};

export default databaseAllRoomsReducer;
