const bcrypt = require('bcryptjs');

// Hash password
const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw new Error('Error hashing password: ' + error.message);
  }
};

// Verify password
const verifyPassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    throw new Error('Error verifying password: ' + error.message);
  }
};

module.exports = { hashPassword, verifyPassword };