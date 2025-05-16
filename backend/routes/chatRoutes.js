const express = require('express');
const router = express.Router();
const {
  sendMessage,
  getMessages,
  getMessagesBetweenUsers
} = require('../controllers/chatController');

// POST /api/chat/send
router.post('/send', sendMessage);

// GET /api/chat/all
router.get('/all', getMessages);

// GET /api/chat/:user1/:user2
router.get('/:user1/:user2', getMessagesBetweenUsers);

module.exports = router;
