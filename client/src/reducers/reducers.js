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
//import counter from './counterReducer';
//import username from './usernameReducer';
//import rooms from './roomsReducer';
//import chatroom from './chatRoomReducer';
//import users from './allUsersReducer';

import hvolsvollur from './hvolsvollurReducer';
import selfoss from './selfossReducer';
import iceland from './icelandReducer';
import message from './messageReducer';
import log from './logReducer';

import currentPrivateChat from './currentPrivateChatReducer';
import currentRoomChat from './currentRoomChatReducer';

import allPrivateMessages from './allPrivateMessagesReducer';
import allRoomMessages from './allRoomMessagesReducer';

import databasePrivateMessages from './databasePrivateMessagesReducer';
import databaseRoomMessages from './databaseRoomMessagesReducer';

import unreadPrivateMsg from './unreadPrivateMessagesReducer';
import unreadRoomMsg from './unreadRoomMessagesReducer';

import users from './allUsersReducer';
import rooms from './allRoomsReducer';

export default combineReducers({
    hvolsvollur, selfoss, iceland, log, message,
    users, currentPrivateChat, allPrivateMessages, databasePrivateMessages, unreadPrivateMsg,
    rooms, currentRoomChat, allRoomMessages, databaseRoomMessages, unreadRoomMsg
});
/*
export default combineReducers({
    pizza, order, offer, cart, checkout, emps, counter
});
*/
