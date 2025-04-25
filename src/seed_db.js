const { sequelize, Item } = require('./models/index');

(async () => {
    await sequelize.sync({force: true});

    const catKeychain = await Item.create({
        name: 'Little kitty keychain',
        description: 'Two-sided 6cm x 8cm keychain.',
        category: 'Keychains',
        price: 9.00,
        quantity: 10
    });

    const catStickerPack = await Item.create({
        name: 'Cat sticker pack',
        description: 'A pack of 15 random cat-themed stickers stickers',
        category: 'Stickers',
        price: 20.00,
        quantity: 5
    });
})();