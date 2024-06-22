import { generateResetToken } from './tokenUtils';
import User from 'models/UserModel';
import db from '../../../db/db';
import nodemailer from 'nodemailer';

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    await db.connect();
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = generateResetToken();
    user.resetToken = resetToken;
    await user.save();
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: user.email,
      to: email,
      subject: 'Password Reset',
      text: `Click the following link to reset your password: http://localhost:3000/authentication/confirm-password?resetToken=${resetToken}`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'Password reset email sent successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

export default forgetPassword;
