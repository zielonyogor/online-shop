const { sequelize, Item } = require('./models/item');

(async () => {
    await sequelize.sync({force: true});

    await Item.create({
        name: 'Little kitty keychain',
        description: 'Two-sided 6cm x 8cm keychain.',
        image: "keychain_cat.png",
        category: 'Keychains',
        price: 9.00,
        quantity: 10
    });

    await Item.create({
        name: 'Cat sticker pack',
        description: 'A pack of 15 random cat-themed stickers stickers',
        image: "cat_stickers.png",
        category: 'Stickers',
        price: 20.00,
        quantity: 5
    });

    await Item.create({
        name: 'Cat portrait',
        description: 'Personalised art of your own cat. After buying please send me a reference photos on Instagram',
        category: 'Drawings',
        price: 70.00,
        quantity: 4
    });

    await Item.create({
        name: 'Cat mug',
        description: '330 ml mug with cat features',
        category: 'Other',
        price: 130.00,
        quantity: 2
    });
})();