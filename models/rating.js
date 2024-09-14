const mongoose = require('mongoose');


const Rating = mongoose.model(
  'Rating', new mongoose.Schema ({
  author: {
    type: mongoose.ObjectId,
    required: 'true'
  },
  recipe: {
    type: mongoose.ObjectId,
    required: 'true'
  }

  })
);

module.exports = Rating;
