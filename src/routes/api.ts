import express from 'express';
import { sequelize, Item } from '../models/index';

const router = express.Router();

// Get all items
router.get('/items', async (req : express.Request, res : express.Response) => {
    const item = await Item.findAll();
    res.json(item);
});

// Get item by ID
router.get('/items/:id', async (req : express.Request, res : express.Response) => {
    const item = await Item.findByPk(req.params.id);
    res.json(item);
});

// Post item
router.post('/items', async (req : express.Request, res : express.Response) => {
    try {
        const { name, description, image, category, price, quantity } = req.body;

        if( !name || !category || !price || !quantity ) {
            res.status(400).json({ message: 'Name, category, price and quantity are required'});
            return;
        }

        const newItem = await Item.create({
            name,
            description: description || null,
            image: image || null,
            category,
            price,
            quantity
        });

        res.status(201).json({message: 'Item created successfully'});

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error creating an item',
            error: error,
        });
    }
});

// Put item
router.put('/items/:id', async (req : express.Request, res : express.Response) => {
    try {
        const { name, description, image, category, price, quantity } = req.body;

        const item = await Item.findByPk(req.params.id);

        if (!item) {
           res.status(404).json({ message: 'Item not found' });
           return;
        }

        await item?.update({
            name: name || item.name,
            description: description || item.description,
            image: image || item.image,
            category: category || item.category,
            price: price || item.price,
            quantity: quantity || item.quantity,
        });

        res.status(201).json({message: 'Item updated successfully'});

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error updating an item',
            error: error,
        });
    }
});


// Delete item by ID
router.delete('/items/:id', async (req : express.Request, res : express.Response) => {
    try {
        const item = await Item.findByPk(req.params.id);

        if (!item) {
           res.status(404).json({ message: 'Item not found' });
           return;
        }

        await item.destroy();

        res.status(201).json({message: 'Item deleted successfully'});

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error deleting an item',
            error: error,
        });
    }
});

export default router;