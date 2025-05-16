const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const generateToken = require('./token');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  res.status(201).json({ token: generateToken(user._id, user.role) });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && await bcrypt.compare(password, user.password)) {
    res.json({ token: generateToken(user._id, user.role) });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};
