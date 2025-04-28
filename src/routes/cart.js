const express = require('express');
const { Item, sequelize } = require('../models/item');

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
    const itemIds = cart.map(i => i.id);

    const t = await sequelize.transaction();

    try {
        const databaseItems = await Item.findAll({
            where: {id: itemIds},
            lock: t.LOCK.UPDATE,
            transaction: t
        });

        for(let cartItem of cart) {
            let dbItem = databaseItems.find(i => i.id == cartItem.id );
            console.log(dbItem);

            if(dbItem.quantity < cartItem.amount) {
                throw new Error('Not enough items in stock');
            }
        }

        for(let cartItem of cart) {
            let dbItem = databaseItems.find(i => i.id == cartItem.id );

            dbItem.quantity -= cartItem.amount;
            await dbItem.save({transaction: t});
        }

        await t.commit();
        req.session.cart = [];
        res.redirect('/cart/success');

    } catch (error) {
        await t.rollback();

        console.log(`Transaction error ${error.message}`);

        req.session.error = error.message || 'Something went wrong :( Try again';
        res.redirect('/cart');
    }
    

    res.status(200);
});

router.get('/success', (req, res) => {
    req.session.cart = [];

    res.render('success', { sess: req.session });
});

module.exports = router;