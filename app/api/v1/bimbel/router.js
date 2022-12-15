const express = require('express');
const router = express();
const { create, index, find, update, destroy } = require('./controller');

router.get('/bimbel', index);
router.get('/bimbel/:id', find);
router.put('/bimbel/:id', update);
router.delete('/bimbel/:id', destroy);
router.post('/bimbel', create);

module.exports = router;