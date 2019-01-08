
const io = require('../app.js').io_chat
//const axios = require("axios");

const { VERIFY_USER, USER_CONNECTED, USER_DISCONNECTED,
		LOGOUT, COMMUNITY_CHAT, MESSAGE_RECIEVED, MESSAGE_SENT,
		TYPING  } = require('./Events')

//const { createUser, createMessage, createChat } = require('./Factories')

var users = {};
var rooms = {};

var allUsers = [];

rooms.lobby = new Room();
rooms.lobby.setTopic("Welcome to the lobby!");

let connectedUsers = { }

//let communityChat = createChat()

//module.exports = function(socket){
exports = module.exports = function (io) {
  	// Set socket.io listeners.
  	io.on('connection', (socket) => {

				console.log('new client connection');
				//getApiAndEmit(socket);

				socket.on('joinroom', function (joinObj, fn) {
					var room = joinObj.room;
					var pass = joinObj.pass;
					var accepted = true;
					var reason;

					//If the room does not exist
					if(rooms[room] === undefined) {
							rooms[room] = new Room();
							//Op the user if he creates the room.
							rooms[room].ops[socket.username] = socket.username;
							//If the user wants to password protect the room we set the password.
							if(pass !== undefined) {
								rooms[room].setPassword(pass);
							}
							//Keep track of the room in the user object.
							users[socket.username].channels[room] = room;
							//Send the room information to the client.
							fn(true);
							//io.sockets.emit('updateusers', room, rooms[room].users, rooms[room].ops);
							//Update topic
							//socket.emit('updatetopic', room, rooms[room].topic, socket.username);
							//io.sockets.emit('servermessage', "join", room, socket.username);

							io.sockets.emit('roomlist', rooms);

					}
					else {

						//If the room isn't locked we set accepted to true.
						if(rooms[room].locked === false) {
							accepted = true;
						}
						//Check if user submits the correct password
						else {
							//If it doesnt match we set accepted to false.
							if(pass != rooms[room].password) {
								accepted = false;
								reason = "wrong password";
							}
						}

						//Check if the user has been added to the ban list.
						if(rooms[room].banned[socket.username] !== undefined) {
							accepted = false;
							reason = "banned";
						}
						//If accepted is set to true at this point the user is allowed to join the room.
						if(accepted) {
							//We need to let the server know beforehand so that he starts to prepare the client template.
							fn(true);
							//Add user to room.
							rooms[room].addUser(socket.username);
							//Keep track of the room in the user object.
							users[socket.username].channels[room] = room;

							socket.emit('roomlist', rooms);
							//Send the room information to the client.
							//io.sockets.emit('updateusers', room, rooms[room].users, rooms[room].ops);
							//socket.emit('updatechat', room, rooms[room].messageHistory);
							//socket.emit('updatetopic', room, rooms[room].topic, socket.username);
							//io.sockets.emit('servermessage', "join", room, socket.username);
						}
						fn(false, reason);
					}
				});

				//socket.removeAllListeners();

				//console.log(io.sockets.sockets.length)
				//console.log(Object.keys(io.sockets.connected).length);

				socket.on('logout', function () {
						console.log('client logout');
						//console.log('remove user');
						var index = 0;
						for (var i = 0; i < allUsers.length; i++) {
								if(allUsers[i] === socket.username) {
										//delete allUsers[i];
										index = i;
								}
						}
						//console.log(socket);
						console.log(allUsers);
						allUsers.splice( index, 1 );

						if(socket.username) {
								//If the socket doesn't have a username the client joined and parted without
								//chosing a username, so we just close the socket without any cleanup.

								if(users[socket.username.channels !== undefined]) {
										for(var room in users[socket.username].channels) {
											//Remove the user from users/ops lists in the rooms he's currently in.
											delete rooms[room].users[socket.username];
											delete rooms[room].ops[socket.username];

											//io.sockets.emit('updateusers', room, rooms[room].users, rooms[room].ops);
										}
								}
								//delete allUsers[socket.username];
								//console.log('socke');
								delete users[socket.username];

								/*
								console.log('remove user');
								var index = 0;
								for (var i = 0; i < allUsers.length; i++) {
										if(allUsers[i] === socket.username) {
												//delete allUsers[i];
												index = i;
										}
								}
								*/
								//console.log(allUsers);
								//allUsers.splice( index, 1 );
								//console.log(allUsers);
								//console.log(users);
								//io.sockets.emit('userlist', allUsers);


						}
						console.log(allUsers);
						//console.log(users);
						//console.log('trying to remove user ---------');
						//console.log(Object.keys(io.sockets.connected).length);
						//console.log(this.socket);
						//this.socket.disconnect(true);
						//console.log('-----------------------------------------------');
						//console.log(socket);
						//console.log('-------------------------------------------');
						//console.log(io.sockets);
						//socket.disconnect(true);
						io.sockets.emit('userlist', allUsers);

				});

				socket.on('disconnect', function () {
						console.log('socket client disconnect');
						//clearInterval(interval);

						if(socket.username) {
								//If the socket doesn't have a username the client joined and parted without
								//chosing a username, so we just close the socket without any cleanup.

								if(users[socket.username.channels !== undefined]) {
										for(var room in users[socket.username].channels) {
											//Remove the user from users/ops lists in the rooms he's currently in.
											delete rooms[room].users[socket.username];
											delete rooms[room].ops[socket.username];

											//io.sockets.emit('updateusers', room, rooms[room].users, rooms[room].ops);
										}
								}
								//delete allUsers[socket.username];
								//console.log('socke');
								delete users[socket.username];

								console.log('remove user');
								var index = 0;
								for (var i = 0; i < allUsers.length; i++) {
										if(allUsers[i] === socket.username) {
												//delete allUsers[i];
												index = i;
										}
								}

								console.log(allUsers);
								allUsers.splice( index, 1 );
								console.log(allUsers);
								//console.log(users);
								io.sockets.emit('userlist', allUsers);

								//socket.close();

						}
				});

				socket.on('adduser', function(username, fn) {

						//Check if username is avaliable.
						if (username.toLowerCase !== "server" && username.length < 21) {
								socket.username = username;
								//console.log('process socket io user');
								console.log('socket: adding user');
								//console.log(username);
								//console.log(allUsers);
								var contains = allUsers.includes(username);
								//console.log(users);
								//console.log(users[username]);
								if(allUsers === undefined || allUsers.length === 0 || !contains) {
										users[username] = { username: socket.username, channels: {}, socket: this };
										console.log('pushing ' + username);

										allUsers.push(username);
								}

								io.sockets.emit('userlist', allUsers);
								//Store user object in global user roster.

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

			socket.on('sendmsg', function (data, fn) {
					var userAllowed = false;

					//Check if user is allowed to send message.

					if(rooms[data.room].users[socket.username] !== undefined) {
						userAllowed = true;
					}
					if(rooms[data.room].ops[socket.username] !== undefined) {
						userAllowed = true;
					}

					//console.log(rooms);
					//console.log(data);
					//console.log(rooms[data.room]);
					if(userAllowed) {
						//Update the message history for the room that the user sent the message to.

						/*
						var messageObj = {
							nick : socket.username,
							timestamp :  new Date(),
							message : data.msg.substring(0, 200)
						};
						*/
						//rooms[data.room].addMessage(messageObj);
						console.log('sending message');
						io.sockets.emit('updatechat', data);
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

/*
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
//};

function Room() {
	this.users = {},
	this.ops = {},
	this.banned = {},
	this.messageHistory = [],
	this.topic = "No topic has been set for room..",
	this.locked = false,
	this.password = "",

	this.addUser = function(user) {
		(user !== undefined) ? this.users[user] = user : console.log("ERROR: add user");
	};
	this.banUser = function(user) {
		(user !== undefined) ? this.banned[user] = user : console.log("ERROR: ban user 1");
		(this.users[user] == user) ? delete this.users[user] : console.log("ERROR: ban user 2");
	};
	this.addMessage = function(message) {
		(message !== undefined) ? this.messageHistory.push(message) : console.log("ERROR: add message");
	};
	this.setTopic = function(topic) {
		(topic !== undefined) ? this.topic = topic : console.log("ERROR: set topic");
	};
	this.setPassword = function(pass) {
		(pass !== undefined) ? this.password = pass : console.log("ERROR: set pass");
		this.locked = true;
	};
	this.clearPassword = function() {
		this.password = "";
		this.locked = false;
	};
}

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
