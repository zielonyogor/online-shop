const express = require('express');
const apiRoutes = require('./api');
const itemRoutes = require('./itemDetails');
const cartRoutes = require('./cart');
const { Item } = require('../models/item');

const router = express.Router();

router.get('/', async (req, res) => {
  const items = await Item.findAll();

  if (!req.session.cart) {
    req.session.cart = [];
  }
  res.render('index', { items: items, sess: req.session });
});

// other JS files
router.use('/api', apiRoutes);
router.use('/items', itemRoutes);
router.use('/cart', cartRoutes);

module.exports = router;