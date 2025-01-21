const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Email Sending Route
app.post('/send-email', async (req, res) => {
  const { name, email, phone, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail', // Change this to your email provider if needed
    auth: {
      user: 'qasimnaeemuddin@gmail.com', // Replace with your email
      pass: 'your_email_password', // Replace with your email password or app password
    },
  });

  const mailOptions = {
    from: email,
    to: 'qasimnaeemuddin@gmail.com', // Replace with your recipient email
    subject: `New Email From ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send email');
  }
});

app.get('/', (req, res) => {
    res.send('Server is running!');
  });
  

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
