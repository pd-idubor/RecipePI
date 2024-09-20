const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const { addRecipe, updateRecipe, retrieveRecipe, deleteRecipe, allRecipes } = require('../controllers/recipeController');
const { verifyToken } = require('../middlewares/jwtAuth');


const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send({ msg: "Welcome!" });
});

// User routes
router.post('/api/register', [registerUser], (req, res) => {
  console.log("Registered");
});

router.post('/api/login', [loginUser], (req, res) => {
  console.log("Logged In");
});

router.get('/api/verify', [verifyToken], (req, res) => {
  console.log("Verified");
});


// Recipe routes
router.post('/api/addRecipe', [verifyToken, addRecipe], (req, res) => {
  console.log("Recipe added");
});	

router.get('/api/retrieveRecipe/:id', [verifyToken, retrieveRecipe], (req, res) => {
  console.log("Recipe.retrieved");
});

router.post('/api/updateRecipe/:id', [verifyToken, updateRecipe], (req, res) => {
  console.log("Recipe updated");
});

router.get('/api/deleteRecipe/:id', [verifyToken, deleteRecipe], (req, res) => {
  console.log("Recipe deleted");
});

router.get('/api/allRecipes', [verifyToken, allRecipes], (req, res) => {
  console.log("Retrieved all");
});


// Catch all 404s
router.get('*', (req, res) => {
  res.status(500).send({msg: 'Page not found'});
});

module.exports = router;
