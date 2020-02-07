const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const sgMail = require('@sendgrid/mail');
const sgTransport = require('nodemailer-sendgrid-transport');
console.log('sendgrid api key', process.env.SENDGRID_API_KEY)
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const router = express.Router();

const User = require("../model/user");
const Token = require("../model/token");
const auth = require('../middleware/auth');

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */
router.post(
  "/signup",
  [
    check("firstname", "Please Enter your Firstname")
      .not()
      .isEmpty(),
    check("lastname", "Please Enter your Lastname")
      .not()
      .isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: false,
        error: errors.array()
      });
    }
    console.log('Passed signup validations')
    const {
      firstname,
      lastname,
      email,
      password
    } = req.body;


    try {
      let user = await User.findOne({
        email
      });

      if (user) {
        return res.status(400).json({
          status: false,
          error: "User Already Exists"
        });
      }

      user = new User({
        firstname,
        lastname,
        email,
        password
      });

      // Password will be hashed before save() if it wasnt modified
      const user_ = await user.save();
      // console.log('Saved use to DB', user_)

      sendEmail(user_, req, res);

    } catch (err) {
      console.log(err.message);
      res.status(500).json({
        status: false,
        error: 'Could not signup'
      });;
    }
  }
);

router.get('/verify/:token', async (req, res) => {
  if (!req.params.token) {
    return res.status(400).json({
      status: false,
      message: "We were unable to find a user for this token."
    })
  };

  // There is a req.params.token
  try {
    // Find a matching token
    const token = await Token.findOne({ token: req.params.token });

    if (!token) {
      return res.status(400).json({
        status: false,
        message: 'We were unable to find a valid token. Your token may have expired.'
      });
    }

    // If we found a token, find a matching user
    User.findOne({ _id: token.userId }, (err, user) => {
      if (!user) {
        return res.status(400).json({
          status: false,
          message: 'We were unable to find a user for this token.'
        });
      }

      // user was found
      if (user.isVerified) return res.status(400).json({ status: false, message: 'This user has already been verified.' });

      // Verify and save the user
      user.isVerified = true;
      user.save(function (err) {
        if (err) return res.status(500).json({ message: err.message });

        res.status(200).json({
          status: true,
          message: "The account has been verified. Please log in."
        });
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
});



/**
 * @method - POST
 * @param - /login
 * @description - User login
 */
router.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: false,
        errors: errors.array()
      });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user)
        return res.status(400).json({
          status: false,
          error: "User Not Exist"
        });

      const isMatch = user.comparePassword(password);
      if (!isMatch)
        return res.status(400).json({
          status: false,
          error: "Incorrect Username or Password !"
        });

      // Make sure the user has been verified
      if (!user.isVerified) return res.status(401).json({ status: false, message: 'Your account has not been verified.' });


      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            status: true,
            message: 'login - data complete ',
            email,
            token
          });
        }
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({
        status: false,
        error: "Server Error"
      });
    }
  }
);

/**
 * @method - GET
 * @description - Get LoggedIn User
 * @param - /user
 */
router.get("/dasboard", auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    res.json({
      status: true,
      data: user
    });
  } catch (e) {
    res.json({ error: "Error in Fetching user" });
  }
});

router.get('/users', (req, res) => {


  User.find((err, users) => {
    if (err) return res.json({ status: false, error: 'cannot find users' });
    if (!users || users.length === 0) return res.json({ status: false, error: 'No User available' });
    res.json({
      status: true,
      message: 'FTC2020 is running',
      data: users
    })
  })

});

router.get('/users/:id', (req, res) => {

  if (!req.params.id) return res.json({ status: false, error: 'No id specified' });
  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) return res.json({ status: false, error: 'cannot find users' });
    if (!user) return res.json({ status: false, error: 'No user with id' });
    res.json({
      status: true,
      message: 'User found',
      data: user
    })
  })

});


router.delete('/users/:id', (req, res) => {
  if (!req.params.id) return res.json({ status: false, error: 'Invalid id' });

  User.deleteOne({ _id: req.params.id }, (err, users) => {
    res.json({
      message: 'User deleted',
      data: users
    })
  });

});

router.patch('/user/:userId/:section', (req, res) => {

  if (!req.params.userId) return res.json({ status: false, error: 'Invalid userID data' });
  if (!req.params.section) return res.json({ status: false, error: 'Invalid section data' });
  const { section, userId } = req.params;
  switch (section) {
    case 'general':
      User.findOne({ _id: userId }, (err, user) => {
        if (err) return res.json({ status: false, error: 'User not found' });
        console.log('updated data', req.body)
        user.general = req.body;

        user.save(err => {
          if (err) return res.json({ status: false, error: 'failed to update user' });
          return res.json({
            status: true,
            message: `Updating ${section} of ${userId}`
          });
        });
      });

      break;
    case 'personal':
      User.findOne({ _id: userId }, (err, user) => {
        if (err) return res.json({ status: false, error: 'User not found' });
        console.log('updated data', req.body)
        user.personal = req.body;

        user.save(err => {
          if (err) return res.json({ status: false, error: 'failed to update user' });
          return res.json({
            status: true,
            message: `Updating ${section} of ${userId}`
          });
        });
      });

      break;
    case 'nok':
      User.findOne({ _id: userId }, (err, user) => {
        if (err) return res.json({ status: false, error: 'User not found' });
        console.log('updated data', req.body)
        user.nok = req.body;

        user.save(err => {
          if (err) return res.json({ status: false, error: 'failed to update user' });
          return res.json({
            status: true,
            message: `Updating ${section} of ${userId}`
          });
        });
      });

      break;
    case 'choir_roles':
      User.findOne({ _id: userId }, (err, user) => {
        if (err) return res.json({ status: false, error: 'User not found' });
        console.log('updated data', req.body)
        user.choir_roles = req.body;

        user.save(err => {
          if (err) return res.json({ status: false, error: 'failed to update user' });
          return res.json({
            status: true,
            message: `Updating ${section} of ${userId}`
          });
        });
      });

      break;
    case 'church_info':
      User.findOne({ _id: userId }, (err, user) => {
        if (err) return res.json({ status: false, error: 'User not found' });
        console.log('updated data', req.body)
        user.church_info = req.body;

        user.save(err => {
          if (err) return res.json({ status: false, error: 'failed to update user' });
          return res.json({
            status: true,
            message: `Updating ${section} of ${userId}`
          });
        });
      });

      break;

    default:
      return res.json({
        message: `Handle errors`
      });
      break;

  }


});


function sendEmail(user, req, res) {

  console.log('SendEmail function called')
  token = user.generateVerificationToken();

  // Save the verification token
  token.save(function (err) {
    if (err) return res.status(500).json({ status: false, message: 'could not save token' });

    let link = "http://" + req.headers.host + "/api/v1/auth/verify/" + token.token;

    const mailOptions = {
      to: user.email,
      from: process.env.FROM_EMAIL,
      subject: 'Account Verification Token',
      text: `Hi ${user.firstname} \n 
                  Please click on the following link ${link} to verify your account. \n\n 
                  If you did not request this, please ignore this email.\n`,
    };

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.FROM_EMAIL,
        pass: process.env.PASSWORD
      }
    });

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) return res.status(500).json({ status: false, message: 'Mail not sent' });

      res.json({
        status: true,
        message: `A verification code has been sent to ${user.email}`
      });
    });


  });

}

module.exports = router;
