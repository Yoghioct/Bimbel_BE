const express = require('express');
const router = express();
const {
  signup,
} = require('./controller');

// const { authenticateParticipant } = require('../../../middlewares/auth');

router.post('/auth/signup', signup);

module.exports = router;
