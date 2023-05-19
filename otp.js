const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.post('/send-email', (req, res) => {
  const { email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'tunehub052@gmail.com',
      pass: 'jsprftzsptnomwpl',
    },
  });

  const mailOptions = {
    from: 'tunehub052@gmail.com',
    to: email,
    subject: 'React Email Example',
    text: message,
    html: `<p>${message}</p>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

app.listen(3002, () => {
  console.log('Server listening on port 3002');
});
