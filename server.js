const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const InitiateMongoServer = require('./api/model/db');
const nodemailer = require("nodemailer");
// const session = require('express-session');
const app = express();
dotenv.config();
app.use(cors());
InitiateMongoServer();
// dotenv.config();
const port = process.env.PORT || 5000;

const User = require('./api/model/user')

// Controllers
const userController = require('./api/controllers/user')
// const checkAdmin = require('./middlewares/checkAdmin');
// const adminController = require('./controllers/adminController');
// cons t indexController = require('./middlewares/unitList');
// const unitsController = require('./controllers/unitsController');
// const authController = require('./controllers/authController');

// Set up express to parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(session({ secret: 'keepitsecret', saveUninitialized: false, resave: false }));

app.use('/api/v1/auth', userController);

app.use('/', (req, res) => {

  res.json({
    message: 'FTC2020 is running'
  })
});

app.listen(port, () => {
  console.log(`App running on :  ${port}`);
});
