const mongoose = require('mongoose');


const User = mongoose.model(
  'User', new mongoose.Schema ({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    default: 'This is information about the user'
  },
  favourites: {
    type: [String]
  }

  })
);

module.exports = User;
