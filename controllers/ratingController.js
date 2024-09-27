const Rating = require('../models/rating');


exports.rateRecipe = async (req, res, next) => {
  const { recipeId, value } = req.body;
  try {
    const rating = new Rating ({
	    author: req.userId,
	    recipe: recipeId,
	    value: parseInt(value)
    });
    await rating.save();
    console.log(rating);
    res.status(200).send({ msg: 'Recipe rated' });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: 'Error rating recipe' });
  }
}

exports.retrieveRating = async (req, res, next) => {
  const id = req.params.id;
  try {
    const rating = await Rating.findById(id);
    if (!rating) res.status(404).send({ msg: 'No rating exists for this recipe' });
    res.status(200).send({ msg: `${rating.value}` });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: 'Error rating recipe' });
  }
}

