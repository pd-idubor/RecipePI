const mongoose = require('mongoose');
const { Schema } = mongoose;


const Rating = mongoose.model(
  'Rating', new Schema ({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  recipe: {
    type: Schema.Types.ObjectId,
    ref: 'Recipe'
  },
  value: {
    type: Number,
    required: true
  }

  })
);

module.exports = Rating;
