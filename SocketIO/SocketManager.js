
const io = require('../app.js').io_chat
const axios = require("axios");

const { VERIFY_USER, USER_CONNECTED, USER_DISCONNECTED,
		LOGOUT, COMMUNITY_CHAT, MESSAGE_RECIEVED, MESSAGE_SENT,
		TYPING  } = require('./Events')

//const { createUser, createMessage, createChat } = require('./Factories')

var users = {};
var allUsers = [];

let connectedUsers = { }

//let communityChat = createChat()

//module.exports = function(socket){
exports = module.exports = function (io) {
  	// Set socket.io listeners.
  	io.on('connection', (socket) => {

				getApiAndEmit(socket);
				//socket.removeAllListeners();

				//console.log(io.sockets.sockets.length)
				//console.log(Object.keys(io.sockets.connected).length);
				socket.on('disconnect', function () {
						console.log('client disconnect');
						//clearInterval(interval);
				});

				console.log('new client connection');

				socket.on('adduser', function(username, fn){

						//Check if username is avaliable.
						if (username.toLowerCase !== "server" && username.length < 21) {
								socket.username = username;
								//console.log('process socket io user');
								console.log(username);
								//console.log(allUsers);
								var contains = allUsers.includes(username);
								users[username] = { username: socket.username, channels: {}, socket: this };
								if(allUsers === undefined || allUsers.length === 0 || !contains) {
										console.log('pushing ' + username);

										allUsers.push(username);
								}

								io.sockets.emit('userlist', allUsers);
								//Store user object in global user roster.


								/*
								// ----------------------
								var userlist = [];

								//We need to construct the list since the users in the global user roster have a reference to socket, which has a reference
								//back to users so the JSON serializer can't serialize them.
								for(var user in users) {
									userlist.push(user);
								}

								socket.emit('userlist', userlist); // I added this
								// ---------------------
								*/
								console.log('added ' + socket.username);
								fn(true); // Callback, user name was available
						}
						else {
								fn(false); // Callback, it wasn't available
						}
			});

			socket.on('privatemsg', function (msgObj, fn) {
					console.log('someone is trying to send private messagae');
					console.log(msgObj);
					//If user exists in global user list.
					if(users[msgObj.nick] !== undefined) {
							//Send the message only to this user.
							users[msgObj.nick].socket.emit('recv_privatemsg', socket.username, msgObj.message);
							//Callback recieves true.
							socket.emit("user_received_msg", true);
							fn(true);
					}
					fn(false);
			});


});
}
/*
  // send weather report every 10 seconds
  var interval = setInterval(function () {
			console.log('interval started');
      //previous = update(previous);
      getApiAndEmit(socket)
  }, 10000);
*/

/*
	socket.on('try', function () {
			console.log('trying to discon');
			socket.disconnect(true);
	})
*/



// hella 6315
// selfoss 6310
// 6222 hvolsvöllur
const getApiAndEmit = async socket => {
	//console.log('nothing going on?');
  try {

    const forecast = await axios.get(
      "https://apis.is/weather/texts?types=2,31"
    );

    socket.emit("weatherForecast", forecast.data.results);

  } catch (error) {
    console.error(`Error 2 - Iceland weather: ${error.code}`);
  }


  const selfoss = await axios.get(
    "https://apis.is/weather/observations/is?stations=6310,6310?time=1h"
  );

  const hvolsvollur = await axios.get(
    "https://apis.is/weather/observations/is?stations=6222,6222?time=1h"
  );

  //console.log(hvolsvollur.data.results[0]);
  socket.emit("FromAPIHvols", hvolsvollur.data.results[0]);

  socket.emit("FromAPISelfoss", selfoss.data.results[0]);

	/*
  // öldusel 63.824410, -20.128533
  const oldusel = await axios.get(
    "https://api.darksky.net/forecast/e3b1e048dd74c7ca5d0a5263e2ca792d/63.824410,-20.128533?lang=is&units=si"
  );

  socket.emit("FromAPI", oldusel.data.currently);
	*/

	/*
  // KELDUR
  const res = await axios.get(
    "https://api.darksky.net/forecast/e3b1e048dd74c7ca5d0a5263e2ca792d/63.816667,-20.083333?lang=is&units=si"
  );
  */
  // longitude: -20.083333
  // lati: 63.816667
  //console.log(res.data.currently.temperature);
  //console.log(oldusel.data.currently.temperature);
};

//}
  /*
	// console.log('\x1bc'); //clears console
	console.log("Socket Id:" + socket.id);

	let sendMessageToChatFromUser;

	let sendTypingFromUser;

	//Verify Username
	socket.on(VERIFY_USER, (nickname, callback)=>{
		if(isUser(connectedUsers, nickname)){
			callback({ isUser:true, user:null })
		}else{
			callback({ isUser:false, user:createUser({name:nickname})})
		}
	})

	//User Connects with username
	socket.on(USER_CONNECTED, (user)=>{
		connectedUsers = addUser(connectedUsers, user)
		socket.user = user

		sendMessageToChatFromUser = sendMessageToChat(user.name)
		sendTypingFromUser = sendTypingToChat(user.name)

		io.emit(USER_CONNECTED, connectedUsers)
		console.log(connectedUsers);

	})

	//User disconnects
	socket.on('disconnect', ()=>{
		if("user" in socket){
			connectedUsers = removeUser(connectedUsers, socket.user.name)

			io.emit(USER_DISCONNECTED, connectedUsers)
			console.log("Disconnect", connectedUsers);
		}
	})


	//User logsout
	socket.on(LOGOUT, ()=>{
		connectedUsers = removeUser(connectedUsers, socket.user.name)
		io.emit(USER_DISCONNECTED, connectedUsers)
		console.log("Disconnect", connectedUsers);

	})

	//Get Community Chat
	socket.on(COMMUNITY_CHAT, (callback)=>{
		callback(communityChat)
	})

	socket.on(MESSAGE_SENT, ({chatId, message})=>{
		sendMessageToChatFromUser(chatId, message)
	})

	socket.on(TYPING, ({chatId, isTyping})=>{
		sendTypingFromUser(chatId, isTyping)
	})

}
*/

/*
* Returns a function that will take a chat id and a boolean isTyping
* and then emit a broadcast to the chat id that the sender is typing
* @param sender {string} username of sender
* @return function(chatId, message)

function sendTypingToChat(user){
	return (chatId, isTyping)=>{
		io.emit(`${TYPING}-${chatId}`, {user, isTyping})
	}
}


/*
* Returns a function that will take a chat id and message
* and then emit a broadcast to the chat id.
* @param sender {string} username of sender
* @return function(chatId, message)

function sendMessageToChat(sender){
	return (chatId, message)=>{
		io.emit(`${MESSAGE_RECIEVED}-${chatId}`, createMessage({message, sender}))
	}
}

/*
* Adds user to list passed in.
* @param userList {Object} Object with key value pairs of users
* @param user {User} the user to added to the list.
* @return userList {Object} Object with key value pairs of Users

function addUser(userList, user){
	let newList = Object.assign({}, userList)
	newList[user.name] = user
	return newList
}

/*
* Removes user from the list passed in.
* @param userList {Object} Object with key value pairs of Users
* @param username {string} name of user to be removed
* @return userList {Object} Object with key value pairs of Users

function removeUser(userList, username){
	let newList = Object.assign({}, userList)
	delete newList[username]
	return newList
}


* Checks if the user is in list passed in.
* @param userList {Object} Object with key value pairs of Users
* @param username {String}
* @return userList {Object} Object with key value pairs of Users

function isUser(userList, username){
  	return username in userList
}
*/
