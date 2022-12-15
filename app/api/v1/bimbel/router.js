const express = require('express');
const router = express();
const { create, index, find, update, destroy } = require('./controller');
const {
    authenticateUser,
    authorizeRoles,
} = require('../../../middlewares/auth')

router.get('/bimbel',authenticateUser, index);
router.get('/bimbel/:id',authenticateUser, find);
router.put('/bimbel/:id',authenticateUser, update);
router.delete('/bimbel/:id',authenticateUser, destroy);
router.post('/bimbel',authenticateUser, create);

module.exports = router;