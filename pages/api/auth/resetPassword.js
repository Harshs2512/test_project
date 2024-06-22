import bcrypt from 'bcrypt';
import User from 'models/UserModel'
import db from '../../../db/db'
const changePassword = async (req, res) => {
    try {
        const { resetToken, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'New password and confirm password do not match' });
        }
        await db.connect();
        // const user = await User.findOne({ _id: userId });
        const user = await User.findOne({ resetToken });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;
        user.resetToken = undefined;
        await user.save();
        await db.disconnect();
        return res.status(200).json({ message: 'Password reset successfully you can log-in ' });
    } catch (error) {
        console.error('Error changing password:', error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export default changePassword;
