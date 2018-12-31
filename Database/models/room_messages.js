var mongoose = require('mongoose');
//var bcrypt = require('bcrypt');

var RoomMessageSchema = new mongoose.Schema({
  room: {
    type: String,
    unique: false,
    required: true,
    trim: true
  },
  sender: {
    type: String,
    unique: false,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true,
  },
  date: {
      type: Date,
      default: Date.now
  }
});

var RoomMessage = mongoose.model('room_messages', RoomMessageSchema);
module.exports = RoomMessage;
