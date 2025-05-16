const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const startupSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  industry: String,
  role: { type: String, default: 'startup' }
});

startupSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('Startup', startupSchema);
