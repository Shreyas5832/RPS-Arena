const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const { hashPassword, verifyPassword } = require('../utils/hash');
require('dotenv').config({ path: require('path').resolve(__dirname, '../../../.env') });

// Signup controller
const signup = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create(username, hashedPassword);

    // Generate JWT
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, username: user.username });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login controller
const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await verifyPassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, username: user.username });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { signup, login };