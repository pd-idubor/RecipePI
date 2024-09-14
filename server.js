const express = require('express');
const router = require('./routes/router');
const dbClient = require('./database');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const port = process.env.PORT || 4500;

dbClient();

app.use(express.json());

app.use('/', router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
