const express = require('express');
const apiRoutes = require('./api');
const itemRoutes = require('./itemDetails');
const { Item } = require('../models/item');

const router = express.Router();

router.get('/', async (req, res) => {
  const items = await Item.findAll();
  res.render('index', { items: items });
});

// other JS files
router.use('/api', apiRoutes);
router.use('/items', itemRoutes);

module.exports = router;