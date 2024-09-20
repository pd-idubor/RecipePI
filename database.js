// Connection to database
const mongoose = require('mongoose');

const dbClient = () => {
  const url = `${process.env.MONGO_URL}`;
  mongoose.connect(url)
  .then(() => {
    console.log("Successfully connected to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });
}

module.exports = dbClient;
