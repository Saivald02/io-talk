import { combineReducers } from 'redux';
/*
import emps from './empsReducer';
import counter from './counterReducer';
import pizza from './pizzaReducer';
import order from './orderReducer';
import offer from './offerReducer';
import cart from './cartReducer';
import checkout from './checkoutReducer';
*/
//import logged from './loggedReducer';
import counter from './counterReducer';
//import username from './usernameReducer';
//import rooms from './roomsReducer';
//import chatroom from './chatRoomReducer';
//import users from './allUsersReducer';

import hvolsvollur from './hvolsvollurReducer';
import selfoss from './selfossReducer';
import iceland from './icelandReducer';
import message from './messageReducer';
import log from './logReducer';

export default combineReducers({
    counter, hvolsvollur, selfoss, iceland, log, message
});
/*
export default combineReducers({
    pizza, order, offer, cart, checkout, emps, counter
});
*/
