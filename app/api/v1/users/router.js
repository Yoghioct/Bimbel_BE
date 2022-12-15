const express = require('express');
const router = express();
const { create, index, find } = require('./controller');

router.get('/users', index);
// router.get('/users/:id', find);
router.post('/users', create);

module.exports = router;