const mongoose = require('mongoose');


const Recipe = mongoose.model(
  'Recipe', new mongoose.Schema ({
  title: {
    type: String,
    required: true
  },
  ingredients: {
    type: [String],
    required: true
  },
  instructions: {
    type: [String],
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  categories: {
    type: [String],
    required: true
  }

  })
);

module.exports = Recipe;
