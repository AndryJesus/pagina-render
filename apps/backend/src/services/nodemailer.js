import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', // O el servicio que uses, como 'outlook', etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const nodemailerService = {
  sendMail: async (mailOptions) => {
    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Could not send email.');
    }
  },
};

export default nodemailerService;
