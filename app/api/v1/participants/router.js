const express = require('express');
// const { getAllBimbel } = require('../../../services/mongoose/bimbel');
const router = express();
const {
  signup,
  signin,
  activeParticipant,
  // getAllBimbel,
} = require('./controller');

// const { authenticateParticipant } = require('../../../middlewares/auth');

router.post('/auth/signup', signup);
router.post('/auth/signin', signin);
router.put('/auth/active', activeParticipant);
// router.get('/bimbel', getAllBimbel);

module.exports = router;