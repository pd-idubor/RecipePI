const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

const jwt = jsonwebtoken;


const emailValidator = (email) => {
    
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

exports.registerUser = async (req, res) => {
  const { username, email, password, bio, favourites } = req.body;
  if (!username || username < 3) {
    return res.status(400).send({msg: "Username is required & must be at least 3 letters"});
  }
  if (!email || !emailValidator(email)) {
    return res.status(400).send({msg: "Please enter a valid email address"});
  }
  if (!password || password < 4) {
    return res.status(400).send({msg: "Please enter a stronger password"});
  }
  let favs;
  if (favourites) favs = favourites.split(', ');
  try {
    console.log("User: ", User);
    const exisitingUser = await User.findOne({ email });

    if (exisitingUser) {
      return res.status(400).json({ msg: "A user account with this email already exists." });
  }

    const hash = bcrypt.hashSync(password, 10);
    const user = new User ({
      username: username,
      email: email,
      password: hash,
      bio: bio,
      favourites: favs
    });

    await user.save();
    console.log("User created: ", user);
    const token = jwt.sign({ id: user.id },
	    process.env.TOKEN_SECRET,
	    {
		algorithm: 'HS256',
		expiresIn: '1hr'
	    });
    return res.status(200).send({ msg: "User was registered successfully!",
    token: token });
  
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
    return;
  };

}

exports.loginUser = async (req, res) => {
  const { username, email, password } = req.body;
   
  if (!email || !emailValidator(email)) {
    return res.status(400).send({ msg: "Invalid email address" })
  }
  if (!password) return res.status(400).send({ msg: "Enter a valid password" });
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "No such account exists!" });
    }

    const pass = bcrypt.compareSync(password, user.password);
    if (!pass) return res.status(400).send({ msg: "Incorrect details" });
    const token = jwt.sign({ id: user.id },
	    process.env.TOKEN_SECRET,
	    {
		    algorithm: 'HS256',
		    expiresIn: '1h'
	    });
    return res.status(200).send({ msg: "Login successful", token: token });

  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
    return;
  }

}

exports.addFavourite = async (req, res, next) => {                    
  try {
    const recipe = req.params.recipe;
    if (!recipe) return res.status(401).send({ msg: 'No recipe indicated' });
    const user = await User.findById(req.userId );
    const favourites = user.favourites;
    console.log(favourites);
    if (favourites.includes(recipe)) {
      return res.status(200).send({ msg: 'Recipe already in favourites' });
    }
    user.favourites.push(recipe);
    await user.save();
    res.status(200).send({ msg: 'Recipe added to favourites' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: 'Error adding favourite' });
  }
}

