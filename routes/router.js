const express = require('express');
const { registerUser, loginUser, addFavourite } = require('../controllers/userController');
const { addRecipe, updateRecipe, retrieveRecipe, deleteRecipe, allRecipes, searchRecipes } = require('../controllers/recipeController');
const { rateRecipe, retrieveRating } = require('../controllers/ratingController');
const { verifyToken } = require('../middlewares/jwtAuth');
const { certifyUser } = require('../controllers/createCert');


const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send({ msg: 'Welcome!' });
});

//Certificate Route
router.post('/api/certificate', [certifyUser], (req, res) => {
  console.log('Certificate sent');
});

// User routes
router.post('/api/register', [registerUser], (req, res) => {
  console.log('Registered');
});

router.post('/api/login', [loginUser], (req, res) => {
  console.log('Logged In');
});

router.get('/api/verify', [verifyToken], (req, res) => {
  console.log('Verified');
});

// Add recipe to favourites
router.get('/api/addFav/:recipe', [verifyToken, addFavourite], async (req, res) => {
  console.log("Favourite added");
});

// Endpoints to search recipe by queries
router.get('/api/search/', [searchRecipes], async (req, res) => {
  console.log('Searched');
});


// Rating routes
router.post('/api/rateRecipe', [verifyToken, rateRecipe], (req, res) => {
  console.log('Recipe rated');
});

router.get('/api/getRating/:id', [retrieveRating], (req, res) => {
  console.log('Rating gotten');
});

// Recipe routes
router.post('/api/addRecipe', [verifyToken, addRecipe], (req, res) => {
  console.log('Recipe added');
});	

router.get('/api/retrieveRecipe/:id', [verifyToken, retrieveRecipe], (req, res) => {
  console.log('Recipe.retrieved');
});

router.post('/api/updateRecipe/:id', [verifyToken, updateRecipe], (req, res) => {
  console.log('Recipe updated');
});

router.get('/api/deleteRecipe/:id', [verifyToken, deleteRecipe], (req, res) => {
  console.log('Recipe deleted');
});

router.get('/api/allRecipes', [allRecipes], (req, res) => {
  console.log('Retrieved all');
});


// Catch all 404s
router.get('*', (req, res) => {
  res.status(500).send({msg: 'Page not found'});
});

module.exports = router;
