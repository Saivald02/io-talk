var mongoose = require('mongoose');
//var bcrypt = require('bcrypt');

var RoomsSchema = new mongoose.Schema({
  room: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  creator: {
    type: String,
    unique: false,
    required: true,
    trim: true
  }
});

var Rooms = mongoose.model('rooms', RoomsSchema);
module.exports = Rooms;
