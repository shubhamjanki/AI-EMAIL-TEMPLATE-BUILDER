const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (to, subject, text) => {
  // Validate environment variables
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('Email credentials are missing. Please check your environment variables.');
  }

  // Validate email address
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  if (!validateEmail(to)) {
    throw new Error('Invalid email address');
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // HTML Email Template
  const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 5px;
        }
        .email-header {
            text-align: center;
            margin-bottom: 20px;
        }
        .email-header h1 {
            font-size: 24px;
            color: #333333;
        }
        .email-content {
            font-size: 16px;
            color: #555555;
            line-height: 1.5;
        }
        .email-footer {
            text-align: center;
            font-size: 12px;
            color:red;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>${subject}</h1>
        </div>
        <div class="email-content">
            <p>Dear recipient,</p>
            <p>${text}</p>
        </div>
        <div class="email-footer">
            <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
    </div>
</body>
</html>

  `;

  // Mail options
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to,
//     subject: `Festive Greetings: ${subject}`,
//     text,
//     html: htmlTemplate,
//   };
const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: `${subject}`,
    text, 
    html: htmlTemplate,
    headers: {
      'Content-Type': 'text/html; charset=UTF-8',
    },
  };
  
  // Send email
  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent to:', to);
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

module.exports = sendEmail;