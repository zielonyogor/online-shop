const express = require('express');
const { Item } = require('../models/item');

const router = express.Router();

router.get('/', async (req, res) => {
    if (!req.session.cart) {
        req.session.cart = [];
    }

    const ids = req.session.cart.map(cartItem => cartItem.id);
    const items = await Item.findAll({
        where: {
            id: ids
        }
    });

    const itemsInCart = items.map(item => {
        const sessionItem = req.session.cart.find(ci => ci.id == item.id);
        return {
            ...item.dataValues,
            amount: sessionItem.amount
        };
    });
    res.render('cart', { itemsInCart: itemsInCart, sess: req.session });
});

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

router.post('/buy', async (req, res) => {
    const cart = req.session.cart;

    cart.forEach(async ({id, amount}) => {
        const item = await Item.findByPk(id);

        if (!item) {
           res.status(404).json({ message: 'Item not found' });
           return;
        }
        
        await item.update({...item, amount: (item.amount - amount)});
    });

    res.status(200);
});

module.exports = router;