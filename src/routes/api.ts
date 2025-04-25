import express from 'express';
import { sequelize, Item } from '../models/index';

const router = express.Router();

// Get all items
router.get('/items', async (request : express.Request, response : express.Response) => {
    const item = await Item.findAll();
    response.json(item);
});

// Get item by ID
router.get('/items/:id', async (request : express.Request, response : express.Response) => {
    const item = await Item.findByPk(request.params.id);
    response.json(item);
});

// Post item
router.post('/items', async (request : express.Request, response : express.Response) => {
    try {
        const { name, description, image, category, price, quantity } = request.body;

        if( !name || !category || !price || !quantity ) {
            response.status(400).json({ message: 'Name, category, price and quantity are required'});
            return;
        }

        const newItem = Item.create({
            name,
            description: description || null,
            image: image || null,
            category,
            price,
            quantity
        });

        response.status(201).json({message: 'Item created successfully'});

    } catch (error) {
        console.log(error);
        response.status(500).json({
            message: 'Error creating an item',
            error: error,
        });
    }
});

export default router;