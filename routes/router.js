const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const { verifyToken } = require('../middlewares/jwtAuth');

const router = express.Router();


router.get('/', (req, res) => {
  res.status(200).send({ msg: "Welcome!" });
});

router.post('/api/register', [registerUser], (req, res) => {
  console.log("Registered");
});

router.post('/api/login', [loginUser], (req, res) => {
  console.log("Logged In");
});

router.get('/api/verify', [verifyToken], (req, res) => {
  console.log("Verification");
});

router.get('*', (req, res) => {
  res.status(500).send({msg: 'Page not found'});
});

module.exports = router;
