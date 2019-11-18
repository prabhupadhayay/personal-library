var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'testnodeviz@gmail.com',
    pass: 'Vibhuti123'
  }
});

var mailOptions = {
  from: 'prabhakar@vibhuti.biz',
  to: 'prabhakar@vibhuti.biz',
  subject: 'Occult Archive Membership Confirmation',
  text: `Hi, thank you for your choosing our plan.
    We will provide you the best services for the library purposes.`
  // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});