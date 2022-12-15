const express = require('express');
const router = express();
const { create, index, find } = require('./controller');
const {
    authenticateUser,
    authorizeRoles,
} = require('../../../middlewares/auth')

router.get('/users',authenticateUser,authorizeRoles('admin'), index);
// router.get('/users/:id', find);
router.post('/users',authenticateUser,authorizeRoles('admin'), create);

module.exports = router;