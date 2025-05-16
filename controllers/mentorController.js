const Mentor = require("../models/Mentor");
const bcrypt = require('bcryptjs');
const generateToken = require('./token');

exports.register = async (req, res) => {
  try {
    const { name, email, password, expertise } = req.body;

    const existingMentor = await Mentor.findOne({ email });
    if (existingMentor) {
      return res.status(400).json({ error: 'Mentor already exists' });
    }

    const mentor = await Mentor.create({ name, email, password, expertise });

    res.status(201).json({
      _id: mentor._id,
      role: mentor.role,
      token: generateToken(mentor._id, mentor.role)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const mentor = await Mentor.findOne({ email });
    if (!mentor) return res.status(404).json({ error: 'Mentor not found' });

    const isMatch = await bcrypt.compare(password, mentor.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid email or password' });

    res.status(200).json({
      _id: mentor._id,
      role: mentor.role,
      token: generateToken(mentor._id, mentor.role)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
