const express = require('express');
const { Item } = require('../models/item');

const router = express.Router();

router.get('/:id', async (req, res) => {
    const item = await Item.findByPk(req.params.id);
    res.render('item', {item: item});
});

module.exports = router;