var mongoose = require('mongoose');
//var bcrypt = require('bcrypt');

var PrivateMessageSchema = new mongoose.Schema({
  sender: {
    type: String,
    unique: false,
    required: true,
    trim: true
  },
  receiver: {
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

var PrivateMessage = mongoose.model('private_messages', PrivateMessageSchema);
module.exports = PrivateMessage;
