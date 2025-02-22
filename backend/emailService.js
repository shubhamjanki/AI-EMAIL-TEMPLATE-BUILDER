const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (to, subject, text) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('Email credentials are missing. Please check your environment variables.');
  }

  // Validate email address
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email);
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

  // 🎨 **Gmail-Compatible Glassmorphic HTML Template**
  const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject}</title>
</head>
<body style="margin:0; padding:0; background-color:#121826; font-family:Arial, sans-serif; text-align:center;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background: #6a11cb; background: linear-gradient(135deg, #6a11cb, #2575fc); padding: 40px 0;">
        <tr>
            <td align="center">
                <table role="presentation" width="90%" max-width="600px" cellspacing="0" cellpadding="0" border="0" style="background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(10px); border-radius: 15px; padding: 20px; color: white;">
                    <tr>
                        <td style="padding: 20px; text-align: center;">
                            <h1 style="font-size: 24px; font-weight: bold; margin: 0;">${subject}</h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 15px; font-size: 16px; text-align: left; line-height: 1.5; background: rgba(255, 255, 255, 0.2); border-radius: 10px;">
                            <p>Dear recipient,</p>
                            <p>${text.replace(/\n/g, '<br>')}</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px; text-align: center;">
                            <a href="https://yourwebsite.com" style="display: inline-block; padding: 12px 24px; font-size: 16px; color: white; background: #2575fc; text-decoration: none; border-radius: 8px;">Visit Now</a>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px; font-size: 12px; opacity: 0.8;">
                            &copy; ${new Date().getFullYear()} Your Company. All rights reserved.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `;

  // Mail options
  const mailOptions = {
    from: `"Your Mail " <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html: htmlTemplate,
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
