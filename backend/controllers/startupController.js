const Startup = require('../Models/Startup');
const bcrypt = require('bcryptjs');
const generateToken = require('./token');

exports.register = async (req, res) => {
  try {
    const { name, email, password, industry } = req.body;
    const existingStartup = await Startup.findOne({ email });
    if (existingStartup) return res.status(400).json({ error: 'Startup already exists' });

    const startup = await Startup.create({ name, email, password, industry });
    res.status(201).json({
      _id: startup._id,
      role: startup.role,
      token: generateToken(startup._id, startup.role)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const startup = await Startup.findOne({ email });
    if (startup && await bcrypt.compare(password, startup.password)) {
      res.json({
        _id: startup._id,
        role: startup.role,
        token: generateToken(startup._id, startup.role)
      });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
