const express = require('express');
const { Item } = require('../models/item');

const router = express.Router();

router.post('/add', async (req, res) => {
    const { id, amount } = req.body;

    if (!req.session.cart) {
        req.session.cart = [];
    }
    
    const existingItem = req.session.cart.find((item) => item.id === id);
    if (existingItem) {
        existingItem.amount += parseInt(amount);
    } 
    else {
        req.session.cart.push({ id, amount: parseInt(amount) });
    }

    console.log('Cart: ', req.session.cart);
    res.redirect(`/items/${id}`);  
});

module.exports = router;