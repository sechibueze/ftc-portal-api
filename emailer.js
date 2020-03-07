var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'lightworthng@gmail.com',
    pass: 'profsammy4U'
  }
});

const mailOptions = {
  from: 'sender@email.com', // sender address
  to: 'sechibueze@gmail.com', // list of receivers
  subject: 'Subject of your email', // Subject line
  html: '<p>Your html here</p>'// plain text body
};

transporter.sendMail(mailOptions, function (err, info) {
  if (err)
    console.log('error', err)
  else
    console.log('success', info);
});