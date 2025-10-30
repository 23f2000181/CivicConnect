import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendStatusUpdateEmail = async (userEmail, issueTitle, oldStatus, newStatus) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: `Issue Status Updated - ${issueTitle}`,
    html: `
      <h2>Issue Status Updated</h2>
      <p>Your reported issue "<strong>${issueTitle}</strong>" status has been updated:</p>
      <p><strong>From:</strong> ${oldStatus} → <strong>To:</strong> ${newStatus}</p>
      <br>
      <p>Thank you for using CivicConnect!</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Email sending failed:', error);
  }
};