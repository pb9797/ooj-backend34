const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

async function sendCustomEmail(to, subject, text, html) {
  if (!to) return;

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject,
    text,
    html
  });
}

module.exports = { sendCustomEmail };
