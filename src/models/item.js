const { Optional, Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './shop.sqlite'
});

class Item extends Model{};

Item.init({
  id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
  name: DataTypes.STRING,
  description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  category: DataTypes.STRING,
  price: DataTypes.DECIMAL,
  quantity: DataTypes.INTEGER,
}, {sequelize, modelName: 'Item'});


module.exports = { sequelize, Item };
