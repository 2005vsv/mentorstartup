const jwt = require('jsonwebtoken');

const JWT_SECRET = 'yourSuperSecretKey123'; // <-- hardcoded secret key here

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, JWT_SECRET, { expiresIn: '30d' });
};

module.exports = generateToken;
