const Recipe = require('../models/recipe');

exports.addRecipe = async (req, res, next) => {
  const { title, ingredients, instructions, categories } = req.body;
  if (!title || !ingredients || !instructions || !categories) {
    return res.status(400).send({ msg: `You need to provide all required information about your recipe!` });
  }
  //console.log(req.userId);
  try {
   const recipe = new Recipe({
	   title: title,
	   ingredients: ingredients.split(', '),
	   instructions: instructions,
	   author: req.userId,
	   categories: categories.split(', ')
   });
    await recipe.save();
    res.status(200).send({ msg: `New recipe added. Id: ${recipe._id}` });
    next();
  } catch (err) {
    //console.log(err);
    return res.status(500).send({ msg: "Error in adding recipe" });
  }
}

exports.retrieveRecipe = async (req, res, next) => {
  try {
    const recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) return res.status(400).send({ msg: 'No recipe found' });
 
    res.status(200).send({ msg: `Recipe: ${recipe}` });
    next();
	  //return;
  } catch (err) {
    //console.log(err);
    return res.status(500).send({ msg: `Error retrieving recipe ${recipeId}` });
  }
}

exports.updateRecipe = async (req, res, next) => {
  try {
    const recipeId = req.params.id;
    const existingRecipe = await Recipe.findById(recipeId);
    if (!existingRecipe) return res.status(400).send({ msg: 'No recipe found' });
    
    const { title, ingredients, instructions, categories } = req.body;
    if (!title || !ingredients || !instructions || !categories) {
      return res.status(400).send({ msg: "You need to provide all required information about your recipe!" });
    }

    const recipe = await Recipe.findOneAndUpdate(
	    { _id: recipeId },
	    { $set: {
		    title: title,
		    ingredients:  ingredients,
		    instructions: instructions,
		    categories: categories
	    	    }
	    }).then(result => {
		console.log(recipe);
		res.status(200).send({ msg: `Recipe Updated\nId: ${req.params.id}` });
	    });
    next();
	    //return;
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: `Error updating recipe` });
  }
}

exports.deleteRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findByIdAndDelete({ _id: req.params.id });
    if (!recipe) return res.status(400).send({ msg: 'No recipe found' });
    res.status(200).send({ msg: 'Recipe deleted' });
    next();
	  //return;
  } catch (error) {                                                         return res.status(500).send({ msg: "Error deleting recipe" });
  }
}

exports.searchRecipes = async (req, res, next) => {
  const queryObj = req.query;
  
  let sortBy;
  if (queryObj.sort) {
    const sort = queryObj.sort;
    sortBy = sort.split(',').join(' ');
    } else {
      sortBy = 'id';
    }

  const page = queryObj.page * 1 || 1;
  const limit = queryObj.limit * 1 || 10;
  const skip = (page - 1) * limit;

  const excludeObj = ['sort', 'page', 'limit'];
  excludeObj.forEach(obj => delete queryObj[obj]);

  try {
    const result = await Recipe.find(queryObj)
	  .sort(sortBy)
	  .skip(skip)
	  .limit(limit);
    return res.status(200).send({ msg: `Success: ${result}` });

  } catch (err) {
    console.log(err);
    return res.status(400).send({ msg: "Error search through recipes" });
  }
}

exports.allRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).send({ Recipes: `${recipes}` });
    next();
	  //return;
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Error retrieving all recipes" });
  }
}

