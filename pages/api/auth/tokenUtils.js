// tokenUtils.js
import crypto from 'crypto';

export  const generateResetToken = () => {
  const token = crypto.randomBytes(32).toString('hex');
  return token;
};
