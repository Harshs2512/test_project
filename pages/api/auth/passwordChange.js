import bcrypt from 'bcrypt';
import User from 'models/UserModel'
import db from '../../../db/db'
const changePassword = async (req, res) => {
  try {
    const { userId, currentPassword, newPassword, confirmNewPassword } = req.body;

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ message: 'New password and confirm password do not match' });
    }
    await db.connect();
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid current password' });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update the user's password in the database
    const Update = await User.updateOne(
      { _id: userId },
      { $set: { password: hashedPassword } }
    );
    await db.disconnect();
    return res.status(200).json({ message: 'Password changed successfully' ,Update});
  } catch (error) {
    console.error('Error changing password:', error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

export default changePassword;
